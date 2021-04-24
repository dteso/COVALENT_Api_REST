const { Router } = require('express');
const { check } = require('express-validator'); //check middlewares
const { validateFields } = require('../middlewares/validate-fields');

const { DeviceController } = require('../controllers/device.controller');
const deviceModel = require('../models/device.model');
const { validateJWT } = require('../middlewares/validate-jwt');
const controller = new DeviceController(deviceModel);

const router = Router();


/*************************************************************** 
                      GET: /api/devices
****************************************************************/
router.get('/', [validateJWT], controller.getDevices);


/*************************************************************** 
                      POST: /api/devices
****************************************************************/
router.post('/',
  [
    validateJWT,
    validateFields,
    check('name', 'Not a valid system id provided').not().isEmpty(),
    check('system', 'Not a valid system id provided').isMongoId()
  ],
  controller.createDevice);

/*************************************************************** 
                      PUT: /api/devices
****************************************************************/
router.put('/:id',
  [validateJWT],
  controller.updateDevice);


/*************************************************************** 
                      DELETE: /api/devices
****************************************************************/
router.delete('/:id', validateJWT, controller.deleteDevice);

module.exports = router;