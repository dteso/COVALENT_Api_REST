const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const fileUpload = require('express-fileupload');

const { MAX_FILE_SIZE } = require('../config/files.config');
const { UploadController } = require('../controllers/upload.controller');
const controller = new UploadController();

const router = Router();

router.use(fileUpload({
  limits: { fileSize: MAX_FILE_SIZE },
  abortOnLimit: true,
  limitHandler: (req, res) => {
    console.log("Max file size reached! ");
    return res.status(413);
  }
}));

router.put('/:collection/:id', validateJWT, controller.uploadFile);

module.exports = router;