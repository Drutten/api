const express = require('express');
const addressController = require('../controllers/addressController');

function routes(){
  
  const addressRouter = express.Router();
  const controller = addressController();
  
  addressRouter.route('/addresses')
  .get(controller.get)
  .post(controller.post);

  addressRouter.route('/addresses/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return addressRouter;
}

module.exports = routes;