const express = require('express');
const customerController = require('../controllers/customerController');

function routes(){
  
  const customerRouter = express.Router();
  const controller = customerController();
  
  customerRouter.route('/customers')
  .get(controller.get)
  .post(controller.post);

  customerRouter.route('/customers/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return customerRouter;
}

module.exports = routes;