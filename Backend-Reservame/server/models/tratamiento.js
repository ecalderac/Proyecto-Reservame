const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tratamientoSchema = new Schema({

    nombre: { type: Date, required: true },
    precio: { type: Number, required: true },
    nroSesiones: { type: Number, required: true },
    precioSesion: { type: Number, required: true }

});

module.exports = mongoose.model('Tratamiento', tratamientoSchema);