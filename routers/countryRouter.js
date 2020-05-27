const express = require('express');
const countryController = require('../controllers/countryController');

function routes(){
  
  const countryRouter = express.Router();
  const controller = countryController();
  
  countryRouter.route('/countries')
  .get(controller.get)
  .post(controller.post);

  countryRouter.route('/countries/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return countryRouter;
}

module.exports = routes;