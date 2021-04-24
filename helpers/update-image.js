const User = require('../models/user.model');
const System = require('../models/system.model');
const Device = require('../models/device.model');

const fs = require('fs');
const updateImage = async (collection, id, uuidFilename) => {

  switch (collection) {
    case 'users':
      console.log("UPLOADING in USERS collection...");
      return manageUpdate(User, collection, id, uuidFilename);
    case 'systems':
      console.log("UPLOADING in USERS collection...");
      return manageUpdate(System, collection, id, uuidFilename);
    case 'devices':
      console.log("UPLOADING in DEVICES collection...");
      return manageUpdate(Device, collection, id, uuidFilename);
    default:
      console.log("ERROR: Wrong collection requested");
      return res.status(400).json({
        ok: false,
        msg: "ERROR: Wrong collection requested",
        targetCollection: collection,
        searchTerm: searchTerm
      });
  }

}

const verifyUploadRequest = async (Model, id) => {
  const model = await Model.findById(id);
  if (!model) {
    console.log(`${Model.modelName} not found in database`);
    return false;
  }
  return true;
}


const manageUpdate = async (Model, collection, id, uuidFilename) => {
  const model = await Model.findById(id);
  if (model) {
    const oldPath = `./uploads/${collection}/${model.img}`;
    //Si existe el archivo en la ruta, lo borramos para ocupar el nuevo
    if (model.img != '' && fs.existsSync(oldPath)) { //Comprueba si existe la ruta
      fs.unlinkSync(oldPath); // Borra el archivo en esa ruta
    }
    model.img = uuidFilename;
    await model.save();
    return true;
  }
  return false;
}

module.exports = {
  updateImage,
  verifyUploadRequest
}