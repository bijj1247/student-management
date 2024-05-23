const express = require('express');
const remarkController = require('./../controllers/remarkController');

const router = express.Router();

router
  .route('/')
  .get(remarkController.getAllRemarks)
  .post(remarkController.createRemark);
router.route('/:id').delete(remarkController.deleteRemark);

module.exports = router;
