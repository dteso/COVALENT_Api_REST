const deviceModel = require('../models/device.model');
const systemModel = require('../models/system.model');
const User = require('../models/user.model');

class SearchController {

  constructor() { }

  fullSearch = async (req, res) => {
    console.log("SEARCH REQUESTED");

    const searchTerm = req.params.searchParam;
    const regex = new RegExp(searchTerm, 'i'); // Makes search ignoring case

    // const users = await User.find({ name: regex });
    // const systems = await systemModel.find({ name: regex });
    // const devices = await deviceModel.find({ name: regex });

    const [users, systems, devices] = await Promise.all([
      User.find({ name: regex }),
      systemModel.find({ name: regex }),
      deviceModel.find({ name: regex })
    ]);

    return res.json({
      ok: true,
      users,
      systems,
      devices
    })
  }


  searchDocumentCollection = async (req, res) => {
    console.log("SEARCH REQUESTED");

    const collection = req.params.collection;
    const searchTerm = req.params.searchParam;

    const regex = new RegExp(searchTerm, 'i'); // Makes search ignoring case
    let data = [];

    switch (collection) {
      case 'users':
        console.log("searching in USERS collection...");
        data = await User.find({ name: regex })
        break;
      case 'systems':
        data = await systemModel.find({ name: regex }).populate('user', 'name email img');
        console.log("searching in SYSTEMS collection...");
        break;
      case 'devices':
        data = await deviceModel.find({ name: regex }).populate('user', 'name email img').populate('system', 'name location img');
        console.log("searching in DEVICES collection...");
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

    res.json({
      ok: true,
      targetCollection: collection,
      result: data,
      searchTerm: searchTerm
    });
  }
}

module.exports = {
  SearchController
}