const express = require('express');
const orderStatusController = require('../controllers/orderStatusController');

function routes(){
  
  const orderStatusRouter = express.Router();
  const controller = orderStatusController();
  
  orderStatusRouter.route('/orderstatuses')
  .get(controller.get)
  .post(controller.post);

  orderStatusRouter.route('/orderstatuses/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return orderStatusRouter;
}

module.exports = routes;