const express = require('express');
const searchController = require('../controllers/searchController');

function routes(){
  
  const searchRouter = express.Router();
  const controller = searchController();
  
  searchRouter.route('/search')
  .get(controller.get)
  
  return searchRouter;
}

module.exports = routes;