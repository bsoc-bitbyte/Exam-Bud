const express = require('express');
const router = express.Router();
// const upload = require('../middleware/uploadMiddleware.js'); //No longer needed
const { fetchLab, deleteLabMaterial, uploadLabMaterial } = require('../controllers/labController.js');

router.get('/subjects/:sid/labs', fetchLab);
router.post('/subjects/:sid/labs', uploadLabMaterial);
router.delete('/labs/:id', deleteLabMaterial);

module.exports = router;