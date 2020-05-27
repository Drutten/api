const express = require('express');
const favoritesCountController = require('../controllers/favoritesCountController');

function routes(){
  
  const favoritesCountRouter = express.Router();
  const controller = favoritesCountController();
  
  favoritesCountRouter.route('/favoritescounts')
  .get(controller.get)
  
  return favoritesCountRouter;
}

module.exports = routes;