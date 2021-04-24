const System = require('../models/system.model');
const User = require('../models/user.model');
const { BaseController } = require('./base.controller');

class SystemController extends BaseController {

  constructor(model) {
    super(model);
  }

  ///////////////////////////////////////
  /*                 GET               */
  ///////////////////////////////////////
  getSystems = async (req, res) => {
    console.log("SYSTEM GET REQUEST");
    const systems = await System.find().populate('user', 'name email img'); //Sería como establecer su propio Dto sin necesidad de definirlo. Nos seguiría saliendo el _id y la __v. Esto se soluciona en el user.model.js
    res.json({
      ok: true,
      msg: `SYSTEMS were LOADED sucessfully`,
      systems,
      userRequestId: req.uid
    });
  }


  ///////////////////////////////////////
  /*                 POST               */
  ///////////////////////////////////////
  createSystem = async (req, res) => {
    console.log("SYSTEM POST REQUEST");
    const uid = req.uid;
    const userExists = await User.findById(uid);

    if (!userExists) {
      console.log("User not found in database");
      return res.status(500).json({
        ok: false,
        msg: 'User not found in database'
      })
    }

    const system = new System({
      user: uid,
      ...req.body
    });

    try {
      console.log("User uid: " + uid);
      await system.save();
    } catch (err) {
      res.status(500).json({
        ok: false,
        msg: err
      })
    }
    res.json({
      ok: true,
      msg: `SYSTEM was CREATED sucessfully`,
      system,
      userRequestId: req.uid
    });
  }


  ///////////////////////////////////////
  /*                 PUT               */
  ///////////////////////////////////////
  updateSystem = async (req, res) => {
    console.log("SYSTEM PUT REQUEST");
    res.json({
      ok: true,
      msg: `SYSTEM was UPDATED sucessfully`,
      systemId: req.params.id,
      userRequestId: req.uid
    });
  }

  ///////////////////////////////////////
  /*                 DELETE               */
  ///////////////////////////////////////
  deleteSystem = async (req, res) => {
    console.log("SYSTEM DELETE REQUEST");
    res.json({
      ok: true,
      msg: `SYSTEM was DELETED sucessfully`,
      systemId: req.params.id,
      userRequestId: req.uid
    });
  }

}

/* EXPORTACIONES */
module.exports = {
  SystemController
}