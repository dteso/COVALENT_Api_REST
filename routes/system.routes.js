const { Router } = require('express');
const { check } = require('express-validator'); //check middlewares

const { SystemController } = require('../controllers/system.controller');
const System = require('../models/system.model');
const { validateJWT } = require('../middlewares/validate-jwt');
const controller = new SystemController(System);

const router = Router();


/*************************************************************** 
                      GET: /api/systems
****************************************************************/
router.get('/', validateJWT, controller.getSystems);



/*************************************************************** 
                      POST: /api/systems
****************************************************************/
router.post('/',
  [
    validateJWT,
    check('name', 'Not a valid system id provided').not().isEmpty(),
  ],
  controller.createSystem);

/*************************************************************** 
                      PUT: /api/systems
****************************************************************/
router.put('/:id',
  [validateJWT],
  controller.updateSystem);


/*************************************************************** 
                      DELETE: /api/systems
****************************************************************/
router.delete('/:id', validateJWT, controller.deleteSystem);

module.exports = router;