const { Schema, model } = require('mongoose');

//const Schema = mongoose.Schema;

const SystemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ssid: {
    type: String
  },
  location: {
    type: String,
    default: '',
  },
  img: {
    type: String,
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
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
}, { timestamps: true }
  //, { collection: 'sistemas'} ---> Añadir esta línea implica que se va a guardar la colección como sistemas en BD y no como Systems que es
  //                                 el nombre del modelo (*ver module.exports del final 'System' -> 'Systems') en plural como hace por defecto mongoose
);

SystemsSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject(); // Evita que en la petición get se muestre el id. 
  return object;
});

module.exports = model('System', SystemsSchema);