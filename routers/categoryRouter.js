const express = require('express');
const categoryController = require('../controllers/categoryController');

function routes(){
  
  const categoryRouter = express.Router();
  const controller = categoryController();
  
  categoryRouter.route('/categories')
  .get(controller.get)
  .post(controller.post);

  categoryRouter.route('/categories/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return categoryRouter;
}

module.exports = routes;