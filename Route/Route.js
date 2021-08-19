const router = require('express').Router();
const { getData, deleteData, updateData, postData, deleteAllData, getID } = require('../Controllers/Controllers')

router.get('/api', getData)
router.get('/api/findid', getID)
router.post('/api/addtodo', postData)
router.delete('/api/:id', deleteData)
router.post('/api/deleteData', deleteAllData)
router.put('/api/:id', updateData)


module.exports = router