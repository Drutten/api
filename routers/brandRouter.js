const express = require('express');
const brandController = require('../controllers/brandController');

function routes(){
  
  const brandRouter = express.Router();
  const controller = brandController();
  
  brandRouter.route('/brands')
  .get(controller.get)
  .post(controller.post);

  brandRouter.route('/brands/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return brandRouter;
}

module.exports = routes;