const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let clienteSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    rut: { type: String, required: [true, 'El rut es necesario'], unique: true },
    email: { type: String, required: [true, 'El correo es necesario'], unique: true },
    edad: { type: Number, required: [true, 'La edad es necesaria'] },
    genero: { type: String, required: [true, 'El genero es necesario'] },
    telefono: { type: Number, required: true },
    fechaNacimiento: { type: String, required: [true, 'La fecha de nacimiento es necesaria'] },
    peso: { type: Number, required: true },
    altura: { type: Number, required: true },
    alergias: { type: String, required: true },
    enfermedad: { type: String, required: true },
    profesion: { type: String, required: true }

});

clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Cliente', clienteSchema);