
const { BaseController } = require('./base.controller');

class DispatcherController extends BaseController {

    sendMail = async (req, res) => {
        try{
            console.log("Post to send mail OK!!!!")
            res.json({
                ok: true,
                msg: 'Received request to post Mail'
            })
        }catch(error){
            res.status(500).json({
                ok: false,
                error
            });
        }
    }

}

module.exports = {
    DispatcherController
  }