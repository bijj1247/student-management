const express = require('express')
const remarkController = require('./../controllers/remarkController')


const router = express.Router()

router.route('/').get(remarkController.getAllRemarks).post(remarkController.createRemark);

module.exports = router;