const { v4: uuidv4 } = require('uuid');
const { updateImage, verifyUploadRequest } = require('../helpers/update-image');
const User = require('../models/user.model');
const System = require('../models/system.model');
const Device = require('../models/device.model');


class UploadController {

  constructor() { }

  uploadFile = async (req, res) => {
    console.log("UPLOAD REQUESTED");
    const collection = req.params.collection;
    const id = req.params.id; // File name

    if (!req.files) {
      return res.status(500).json({
        ok: false,
        msg: 'ERROR: no file attached.'
      });
    }

    //Payload too large
    if (res.statusCode === 413) {
      return res.status(413).json({
        ok: false,
        msg: 'ERROR: max filesize reached'
      });
    }

    const file = req.files.image; // File content - image en este caso es incluída con esa key en la petición

    const splicedFileName = file.name.split('.'); // File name
    const fileExtension = splicedFileName[splicedFileName.length - 1];

    const allowedCollections = ['users', 'systems', 'devices'];
    //Allowed collection validation
    if (!allowedCollections.includes(collection)) {
      return res.status(400).json({
        ok: false,
        msg: 'ERROR: selected collection does not allows file uploading'
      });
    }
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    //Allowed extensions validation
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({
        ok: false,
        msg: 'ERROR: not valid file type. Only ' + [...allowedExtensions] + ' extensions allowed'
      });
    }

    // File exists validation
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'No files were uploaded.'
      });
    }

    //Generate unique file name
    const uniqueFileName = `${uuidv4()}`;
    const uuidFilename = `${uniqueFileName}.${fileExtension}`
    //Path to save image
    const path = `./uploads/${collection}/${uuidFilename}`;

    let _model;
    switch (collection) {
      case 'users':
        _model = User;
        break;
      case 'systems':
        _model = System;
        break;
      case 'devices':
        _model = Device;
        break;
      default:
        console.log("ERROR: Wrong collection requested");
        return res.status(400).json({
          ok: false,
          msg: "ERROR: Wrong collection requested",
          targetCollection: collection,
          searchTerm: searchTerm
        });
    }

    const enableUpdate = await verifyUploadRequest(_model, id);
    if (!enableUpdate) {
      return res.status(400).json({
        ok: false,
        msg: `ERROR: ${id} not found for any ${_model.modelName}`,
        targetCollection: collection
      });
    }
    //Save image on path
    file.mv(path, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: err
        });
      }
      //Update database
      const update = await updateImage(collection, id, uuidFilename);
      if (!update) {
        return res.status(401).json({
          ok: false,
          msg: `Not found ${collection} for the requested id`
        });
      }
      res.json({
        ok: true,
        msg: `File UPLOADED over collection ${collection} as  ${uuidFilename}`,
        targetCollection: collection,
        uuidFilename
      });
    });
  }
}

module.exports = {
  UploadController
}