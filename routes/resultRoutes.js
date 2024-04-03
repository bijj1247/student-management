const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router();

router
  .route('/')
  .get(resultController.getAllResults)
  .post(resultController.createResult);

router.route('/mongoId').get(resultController.getResultByMongoId);

router
  .route('/:id')
  .get(resultController.getResultsById)
  .patch(resultController.updateResult)
  .delete(resultController.deleteResult);

module.exports = router;
