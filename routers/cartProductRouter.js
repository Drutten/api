const express = require('express');
const cartProductController = require('../controllers/cartProductController');

function routes(){
  
  const cartProductRouter = express.Router();
  const controller = cartProductController();
  
  cartProductRouter.route('/cartproducts')
  .get(controller.get)
  .post(controller.post)
  .put(controller.put)
  .delete(controller.remove);


  return cartProductRouter;
}

module.exports = routes;