const db = require('../db');

promoTypeController = () => {





  get = async (req, res) => {
    try {
      return await db.makeRequest(req, res);

    } catch (err) {
      return res.status(404);
    }
  }





  post = async (req, res) => {
    try {
      return await db.makeRequest(req, res);
    }
    catch (err) {
      res.status(500);
      console.log(err.message);
      return res.send('Unable to create');
    }
  };



  put = async (req, res) => {
    try {
        return await db.makeRequest(req, res);
    }
    catch (err) {
        res.status(500);
        console.log(err.message);
        return res.send('Unable to update');
    }
  };



  remove = async (req, res) => {
    try {
        await db.makeRequest(req, res);
    }
    catch (err) {
        console.log(err.message);
        res.status(500);
        return res.send('Unable to Delete');
    }
  };




  return { get, post, put, remove }
}

module.exports = promoTypeController;