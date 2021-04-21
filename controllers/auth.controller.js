const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { BaseController } = require('./base.controller');
const { generateJWT } = require('../helpers/jwt');

class AuthController extends BaseController {

  constructor(model) {
    super(model);
  }

  login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
      const dbUser = await User.findOne({ email });
      if (!dbUser) {
        return res.status(500).json({
          ok: false,
          msg: "Login ERROR"
        });
      }

      /************************************* 
       *       Password Verification
      *************************************/
      const validPassword = bcrypt.compareSync(password, dbUser.password);
      ///////////////////////////////////////


      if (!validPassword) {
        return res.status(500).json({
          ok: false,
          msg: "Login ERROR"
        });
      }

      /************************************* 
       *          JWT Generation
      *************************************/
      const token = await generateJWT(dbUser.id);
      ///////////////////////////////////////

      res.json({
        ok: true,
        msg: 'login ok',
        token
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "An error ocurred. Read logs."
      });
    }
  }

}

/* EXPORTACIONES */
module.exports = {
  AuthController
}