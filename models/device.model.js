const { Schema, model } = require('mongoose');

//const Schema = mongoose.Schema;

const DevicesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  wifiSSID: {
    type: String
  },
  bluetoothConnected: {
    type: Boolean,
    default: false
  },
  bluetoothEnabled: {
    type: Boolean,
    default: false
  },
  bluetoothId: {
    type: String
  },
  bluetoothOnline: {
    type: Boolean,
    default: false
  },
  deviceMAC: {
    type: String
  },
  humidity: {
    type: String
  },
  localIp: {
    type: String
  },
  mcu: {
    type: String
  },
  mqttPort: {
    type: String
  },
  mqttServer: {
    type: String
  },
  ntpData: {
    type: String
  },
  ntpEnabled: {
    type: Boolean,
    default: false
  },
  online: {
    type: Boolean,
    default: false
  },
  serialConnected: {
    type: Boolean,
    default: false
  },
  serialEnabled: {
    type: Boolean,
    default: false
  },
  temperature: {
    type: String
  },
  type: {
    type: String
  },
  webServerEnabled: {
    type: Boolean,
    default: false
  },
  wifiConnected: {
    type: Boolean,
    default: false
  },
  wifiEnabled: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  system: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'System'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
}, { timestamps: true }
  //, { collection: 'dispositivos'} ---> Añadir esta línea implica que se va a guardar la colección como sistemas en BD y no como Devices que es
  //                                 el nombre del modelo (*ver module.exports del final 'Device' -> 'Devices') en plural como hace por defecto mongoose
);

DevicesSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject(); // Evita que en la petición get se muestre el id. 
  return object;
});

module.exports = model('Device', DevicesSchema);