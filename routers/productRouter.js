const express = require('express');
const productController = require('../controllers/productController');

function routes(){
  
  const productRouter = express.Router();
  const controller = productController();
  
  productRouter.route('/products')
  .get(controller.get)
  .post(controller.post);

  productRouter.route('/products/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return productRouter;
}

module.exports = routes;