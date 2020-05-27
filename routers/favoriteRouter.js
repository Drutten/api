const express = require('express');
const favoriteController = require('../controllers/favoriteController');

function routes(){
  
  const favoriteRouter = express.Router();
  const controller = favoriteController();
  
  favoriteRouter.route('/favorites')
  .get(controller.get)
  .post(controller.post)
  .delete(controller.remove)

  

  return favoriteRouter;
}

module.exports = routes;