const express = require('express');
const reviewController = require('../controllers/reviewController');

function routes(){
  
  const reviewRouter = express.Router();
  const controller = reviewController();
  
  reviewRouter.route('/reviews')
  .get(controller.get)
  .post(controller.post)
  .put(controller.put)
  .delete(controller.remove);


  return reviewRouter;
}

module.exports = routes;