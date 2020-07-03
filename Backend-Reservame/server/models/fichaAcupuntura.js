const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let fichaAcupunturaSchema = new Schema({

    estadoPaciente: { type: String, required: true },
    descripcionEstado: { type: String, required: true },
    antecedentesPatologicos: { type: String, required: true },
    antecedentesFamiliares: { type: String, required: true },
    medicacionActual: { type: String, required: true },
    consumos: { type: String, required: true },
    actividadFisica: { type: String, required: true },
    tratamiento: { type: Schema.Types.ObjectId, ref: 'Tratamiento' },
    //diagnosticoAcupuntura: { type: Schema.Types.ObjectId, ref: 'DiagnosticoAcupuntura' } 

});

module.exports = mongoose.model('FichaAcupuntura', fichaAcupunturaSchema);