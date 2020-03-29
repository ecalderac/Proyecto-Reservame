const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subFichaAcupunturaSchema = new Schema({

    fecha: { type: Date, required: true, default: Date.now() },
    prescripcionBasica: { type: String, required: true },
    puntosAuxiliares: { type: String, required: true },
    tecnica: { type: String, required: true },
    observaciones: { type: String, required: true },
    eva_A: { type: String, required: true },
    eva_D: { type: String, required: true },
    fichaAcupuntura: { type: Schema.Types.ObjectId, ref: 'FichaAcupuntura' }

});

module.exports = mongoose.model('SubFichaAcupuntura', subFichaAcupunturaSchema);