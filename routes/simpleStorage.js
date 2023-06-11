const express = require('express')
const router = express.Router()
const simpleStorageController = require('../controllers/simpleStorage')

router.put('/store', simpleStorageController.store)
router.get('/retrieve', simpleStorageController.retrieve)

router.post('/deployContract', simpleStorageController.deployContract)
router.put('/setContract', simpleStorageController.setContract)

module.exports = router
