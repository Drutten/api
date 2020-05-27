const express = require('express');
const shippingMethodController = require('../controllers/shippingMethodController');

function routes(){
  
  const shippingMethodRouter = express.Router();
  const controller = shippingMethodController();
  
  shippingMethodRouter.route('/shippingmethods')
  .get(controller.get)
  .post(controller.post);

  shippingMethodRouter.route('/shippingmethods/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return shippingMethodRouter;
}

module.exports = routes;