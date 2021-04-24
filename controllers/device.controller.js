const Device = require('../models/device.model');
const { BaseController } = require('./base.controller');
const { sendCustomMail } = require('../helpers/mail');

class DeviceController extends BaseController {

  constructor(model) {
    super(model);
  }

  ///////////////////////////////////////
  /*                 GET               */
  ///////////////////////////////////////
  getDevices = async (req, res) => {
    console.log("DEVICE GET REQUEST");
    const devices = await Device.find()
      .populate('user', 'name email')
      .populate('system', 'name location');
    res.json({
      ok: true,
      msg: `DEVICES were LOADED sucessfully`,
      devices,
      userRequestId: req.uid
    });
  }


  ///////////////////////////////////////
  /*                 POST               */
  ///////////////////////////////////////


  createDevice = async (req, res) => {
    console.log("DEVICE POST REQUEST");
    const uid = req.uid;
    const device = new Device({
      user: uid,
      ...req.body
    });

    try {
      const dbDevice = await device.save();
      res.json({
        ok: true,
        msg: `DEVICE was CREATED sucessfully`,
        device: dbDevice,
        userRequestId: req.uid
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        msg: err
      });
    }
  }


  ///////////////////////////////////////
  /*                 PUT               */
  ///////////////////////////////////////
  updateDevice = async (req, res) => {
    console.log("DEVICE PUT REQUEST");
    res.json({
      ok: true,
      msg: `DEVICE was UPDATED sucessfully`,
      deviceId: req.params.id,
      userRequestId: req.uid
    });
  }

  ///////////////////////////////////////
  /*                 DELETE               */
  ///////////////////////////////////////
  deleteDevice = async (req, res) => {
    console.log("DEVICE DELETE REQUEST");
    res.json({
      ok: true,
      msg: `DEVICE was DELETED sucessfully`,
      deviceId: req.params.id,
      userRequestId: req.uid
    });
  }

}

/* EXPORTACIONES */
module.exports = {
  DeviceController
}