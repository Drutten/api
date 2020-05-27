const express = require('express');
const orderRowController = require('../controllers/orderRowController');

function routes(){
  
  const orderRowRouter = express.Router();
  const controller = orderRowController();
  
  orderRowRouter.route('/orderrows')
  .get(controller.get)
  .post(controller.post);

  orderRowRouter.route('/orderrows/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return orderRowRouter;
}

module.exports = routes;