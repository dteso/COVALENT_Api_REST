const { Router } = require('express');
const { check } = require('express-validator'); //check middlewares
const { validateFields } = require('../middlewares/validate-fields');

const { AuthController } = require('../controllers/auth.controller');
const userModel = require('../models/user.model');
const controller = new AuthController();

const router = Router();

/*************************************************************** 
                      POST: /api/login
****************************************************************/
//router.post('/', createUser); //router.post('/', [{ mmiddleware1 }, { middleware2 }], createUser);
router.post('/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
  ],
  controller.login);

module.exports = router;
