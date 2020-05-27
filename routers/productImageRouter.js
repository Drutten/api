const express = require('express');
const productImageController = require('../controllers/productImageController');

function routes(){
  
  const productImageRouter = express.Router();
  const controller = productImageController();
  
  productImageRouter.route('/productimages')
  .get(controller.get)
  .post(controller.post);

  productImageRouter.route('/productimages/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return productImageRouter;
}

module.exports = routes;