const db = require('../db');

favoritesCountController = () => {



  get = async (req, res) => {
    try {
      return await db.makeRequest(req, res);

    } catch (err) {
      return res.status(404);
    }
  }



  return { get }
}

module.exports = favoritesCountController;
