const express = require('express');
const productCategoryController = require('../controllers/productCategoryController');

function routes(){
  
  const productCategoryRouter = express.Router();
  const controller = productCategoryController();
  
  productCategoryRouter.route('/productcategories')
  .get(controller.get)
  .post(controller.post)
  .delete(controller.remove);


  return productCategoryRouter;
}

module.exports = routes;