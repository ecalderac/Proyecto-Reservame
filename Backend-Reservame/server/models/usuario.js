const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    rut: { type: String, required: [true, 'El rut es necesario'], unique: true },
    email: { type: String, required: [true, 'El correo es necesario'], unique: true },
    password: { type: String, required: ['La contraseña es obligatoria'] },
    telefono: { type: Number, required: false },
    rol: { type: String, required: true },
    profesion: { type: String, required: true },
    estado: { type: String, required: true, default: true }

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);