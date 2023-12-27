const express = require('express');
const router = express.Router();
// Require controller modules.
const fileupload = require('../controllers/fileUploaderController/fileuploaderController.js');
const getFileData = require('../controllers/fileUploaderController/getfileController.js')
const quotation = require('../controllers/quotationController/quotationController.js');
const getQuotation = require('../controllers/quotationController/getquotionController.js');


// ************* routes for files *****************// 
router.post('/fileupload/',  fileupload);
router.get('/getfile/',getFileData)

// ******* routes for quotation ***********//
router.post('/quotation/',quotation)
router.get('/get/quotation/',getQuotation)





module.exports = router;







