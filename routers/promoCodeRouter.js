const express = require('express');
const promoCodeController = require('../controllers/promoCodeController');

function routes(){
  
  const promoCodeRouter = express.Router();
  const controller = promoCodeController();
  
  promoCodeRouter.route('/promocodes')
  .get(controller.get)
  .post(controller.post);

  promoCodeRouter.route('/promocodes/:Id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.remove);

  return promoCodeRouter;
}

module.exports = routes;