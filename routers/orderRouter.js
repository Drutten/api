const express = require('express');
const orderController = require('../controllers/orderController');

function routes(){
  
  const orderRouter = express.Router();
  const controller = orderController();
  
  orderRouter.route('/orders')
  .get(controller.get)
  .post(controller.post);

  orderRouter.route('/orders/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return orderRouter;
}

module.exports = routes;