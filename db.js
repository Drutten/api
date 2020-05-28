const sql = require('mssql');
const config = require('./config');





//Anropas vid get, skapar länkar som läggs till records
createHateoasLinks = (req, records, hateoas) =>{

  return records.recordset.map((record) => {
    record.links = {};

    hateoas.forEach( (link) =>{
        if(record.hasOwnProperty('Id') && link.endpoint !== 'favorites' &&  link.endpoint !== 'cartproducts' && link.endpoint !== 'search'){
            
            record.links[link.property.toLowerCase() == 'id' ? 'self' : link.property.toLowerCase()] =
            `http://${req.headers.host}/api/${link.endpoint}/${record[link.property]}` // om PK nyckeln heter Id 
        }
        else if(req.urlParameters.length > 0){
            record.links['self'] =
            `http://${req.headers.host}/api/${link.endpoint}${req.urlParameters}`;
        }
        else{
            //Om sammansatt nyckel men inte använd i query sträng (hämtar lista)
            let props = [];
            let queryParams = '';
            Object.getOwnPropertyNames(record).forEach(prop =>{
                if(prop.indexOf('Id') !== -1) { 
                    props.push(prop);      
                }   
            });
            if(props.length > 1){
                
                props.forEach(item =>{
                    queryParams += `${item}=${record[item]}&`;
                });
                if(queryParams.length > 0){ 
                    queryParams = queryParams.substring(0, queryParams.length-1);
                    queryParams = `?${queryParams}`;   
                }
            }
            record.links['self'] =
             `http://${req.headers.host}/api/${link.endpoint}${queryParams}`;

        }
        
    });

    return record;
  });
}






createEndpoint = (req) => {
    let endpoint = req.route.path.substring(1);
    //Skapa req properties
    req.hasId = req.params.Id > 0;
    req.hasQuery = Object.keys(req.query).length > 0;
    req.numQueryParams = Object.keys(req.query).length;

    req.endpoint = (req.hasId) ? endpoint.substring(0, endpoint.length -4) :
    endpoint;

    req.isComposite = (req.endpoint === 'favorites' || req.endpoint === 'cartproducts' ||
    req.endpoint === 'productcategories' || req.endpoint === 'reviews');


    //Skapa req property endpointSingular
    if(req.endpoint.endsWith('ies')) {
        req.endpointSingular = `${req.endpoint.substring(0, req.endpoint.length-3)}y`;
    }
    else if(req.endpoint.endsWith('ses')||req.endpoint.endsWith('xes')) {
        req.endpointSingular = `${req.endpoint.substring(0, req.endpoint.length-2)}`;
    }
    else req.endpointSingular = `${req.endpoint.substring(0, req.endpoint.length-1)}`;
        
}





//Skapa sp name
createSpName = (req) => {
    
    createEndpoint(req);
    let method = req.method;
    let isSingularException = false;
    if(req.method.toUpperCase() === 'PUT'){ method = 'Update'; }
    if(req.method.toUpperCase() === 'POST'){ method = 'Add'; }
    //Skapa property sp och isPlural
    req.sp = `${method}${req.endpointSingular}`; //get med id samt några med query param, post, put och delete är singular
    req.isPlural = false;

    if(req.sp.toLowerCase()==='getbasiccart' || req.sp.toLowerCase()==='getfavoritescount'){
        isSingularException = true;
    }

    if(!req.hasId && !req.hasQuery && req.method.toUpperCase()==='GET'){ //get utan varken params eller queryparams är plural
        req.sp = `${method}${req.endpoint}`;
        req.isPlural = true;   
    }
    else if(req.hasQuery && (req.query.hasOwnProperty('orderNumber') || req.query.hasOwnProperty('OrderNumber'))){
        req.sp += 'ByOrderNumber';
    }
    else if(req.hasQuery && req.method.toUpperCase()==='GET' && !isSingularException){
        let count = 0;
        let propName = '';
        Object.getOwnPropertyNames(req.query).forEach(prop =>{
            if(prop.indexOf('Id') !== -1 && prop !== 'Id') { 
                count++;
            }
            propName = prop;
        });
        if(count < 2){
            req.sp = `${method}${req.endpoint}`;  //inte composite key, alltså plural
            req.isPlural = true;
            //Förlängda SP-namn, getFavorites och getSearch undantag
            if(req.sp.toLowerCase()!=='getfavorites' && req.sp.toLowerCase()!=='getsearch'){
                req.sp += `By${propName}`;   
            }
        
        } 
    }
    
}






createParameters = (req) => {

    //skapa property sqlParameters
    req.sqlParameters = '';
    req.urlParameters = '';
    
    if(req.hasId) req.sqlParameters += `@Id=${req.params.Id}, `;
    
    if(req.hasQuery){
        let queryParams = '';
        Object.getOwnPropertyNames(req.query).forEach(prop =>{
            if(!isNaN(req.query[prop])){
                if(prop.toLowerCase().indexOf('stars') !== -1){
                    queryParams += `@Stars=${req.query[prop]}, `;
                }
                else{
                    queryParams += `@${prop}=${req.query[prop]}, `;
                }    
            }
            else if(typeof(req.query[prop])==='boolean'){
                queryParams += req.query[prop] ? `@${prop}=1, ` : `@${prop}=0, `;
            }
            else if(typeof(req.query[prop])==='string'){
                queryParams += `@${prop}='${req.query[prop]}', `;
            }
            req.urlParameters += `${prop}=${req.query[prop]}&`;   
        });
        req.sqlParameters += queryParams;

        if(req.urlParameters.length > 0){
            req.urlParameters = req.urlParameters.substring(0, req.urlParameters.length-1);
            req.urlParameters = `?${req.urlParameters}`;
        }

    }
    if(Object.keys(req.body).length > 0){
        let bodyParams = '';
        Object.getOwnPropertyNames(req.body).forEach(prop =>{
            if(!isNaN(req.body[prop])){
                bodyParams += `@${prop}=${req.body[prop]}, `;
            }
            else if(typeof(req.body[prop])==='boolean'){
                bodyParams += req.body[prop] ? `@${prop}=1, ` : `@${prop}=0, `;
            }
            else if(typeof(req.body[prop])==='string'){
                bodyParams += `@${prop}='${req.body[prop]}', `;
            }
            else if(req.body[prop]===null){
                bodyParams += `@${prop}='${null}', `;
            }  
        });
        req.sqlParameters += bodyParams; 
    }
    //Ta bort kommatecken i slutet
    if(req.sqlParameters){
        req.sqlParameters = req.sqlParameters.trim();
        req.sqlParameters = req.sqlParameters.substring(0, req.sqlParameters.length-1);
    }    
}







queryDatabase = async (req, res) => {
    try{
        //console.log(`test....${req.sp} ${req.sqlParameters}`);
        await sql.connect(config);
        const result = await sql.query(`EXEC ${req.sp} ${req.sqlParameters}`);
        if(req.method.toUpperCase() == 'GET'){
            if (result.recordset.length == 0) {
                res.status(404);
                throw new Error('Could not find the resource');
            }  
        }
        if(req.method.toUpperCase() == 'PUT' || req.method.toUpperCase() == 'DELETE') {
            res.status(204);
            res.message = (req.method.toUpperCase() == 'PUT') ? 
                'Updated successfully': 'Deleted successfully';
        }
        if(req.method.toUpperCase() == 'POST'){
            res.status(201);
            if(result.recordset === undefined){
                res.message ='Resource added';
            } 
        }
        return result;    
    }
    catch(err){
        if(req.method.toUpperCase()==='GET'){
            res.status(404);
            res.sqlError = err.message;
        }
        else{
            res.status(400);
            if(req.method.toUpperCase()==='PUT'){res.sqlError = 'Could not update';}
            else if(req.method.toUpperCase()==='POST'){res.sqlError = 'Could not create';}
            else if(req.method.toUpperCase()==='DELETE'){res.sqlError = 'Could not delete';}
            else{res.sqlError = 'Bad request';}
        }
        
        console.log('first catch '+err.message);
        throw err;
    }
}






makeRequest = async (req, res) => {
    try{
        createSpName(req);
        if ((req.method.toUpperCase() == 'PUT' || req.method.toUpperCase() == 'DELETE') && !req.hasId && !req.isComposite){
            res.status(400);
            return res.send('Valid Id URI parameter is required');
        }
        else if((req.method.toUpperCase() == 'PUT' || req.method.toUpperCase() == 'DELETE') && req.isComposite){
            let count = 0;
            Object.getOwnPropertyNames(req.query).forEach(prop =>{
                if(prop.indexOf('Id') !== -1 && !isNaN(req.query[prop])) { 
                    count++;
                }
            });
            if(count < 2){
                res.status(400);
                return res.send("Composite key id's are required");  
            }
        }
        createParameters(req);

        const result = await queryDatabase(req, res);

        if(req.sqlError){
            console.log('hello');
            return res.send(res.sqlError);
        }
        
        if(req.method.toUpperCase() === 'GET'){
            //hateoas
            let hateoas = [{property: 'Id', endpoint: `${req.endpoint}`}];
            const records = createHateoasLinks(req, result, hateoas);
            return res.json((req.isPlural) ? records : records[0]);
        }
        //PUT, DELETE or POST utan returnerad recordset
        if(res.message){return res.send(res.message);} 
        //POST recordset returnerad
        return res.json(jsonKeysToLowerCase(result.recordset[0]));
    }
    catch(err){
        if(err.message.indexOf('Connection lost') !== -1 
        || err.message.indexOf('Login failed') !== -1){
            res.status(500);
        }
        console.log('status...'+res.statusCode);
        if(res.sqlError){
            return res.send(res.sqlError);   
        }
        throw err;
    }  
}






jsonKeysToLowerCase = (record) => Object.fromEntries(
    Object.entries(record).map(([k, v]) => [k[0].toLowerCase()+k.substring(1), v]));






module.exports = { makeRequest };