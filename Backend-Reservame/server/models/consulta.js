const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let consultaSchema = new Schema({

    estado: { type: String, required: true, default: true },
    fecha: { type: Date, required: true, default: Date.now() },
    hora: { type: Date, required: true },
    motivoConsulta: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' }

});

module.exports = mongoose.model('Consulta', consultaSchema);