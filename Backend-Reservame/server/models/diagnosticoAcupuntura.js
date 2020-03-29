const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let diagnosticoAcupunturaSchema = new Schema({

    fecha: { type: Date, required: true, default: Date.now() },
    unia: { type: String, required: true },
    colorCara: { type: String, required: true },
    expresion: { type: String, required: true },
    vitalidad: { type: String, required: true },
    voz: { type: String, required: true },
    habla: { type: String, required: true },
    respiracion: { type: String, required: true },
    tos: { type: String, required: true },
    olorHalitosis: { type: String, required: true },
    frioCalor: { type: String, required: true },
    sudor: { type: String, required: true },
    oidoMareos: { type: String, required: true },
    vistaOjos: { type: String, required: true },
    apetito: { type: String, required: true },
    sabores: { type: String, required: true },
    sed: { type: String, required: true },
    orinaDefeca: { type: String, required: true },
    menstruacion: { type: String, required: true },
    sexualidad: { type: String, required: true },
    memoria: { type: String, required: true },
    dolor: { type: String, required: true },
    otros: { type: String, required: true },
    l_cuerpoColor: { type: String, required: true },
    l_cuerpoForma: { type: String, required: true },
    l_saburraColor: { type: String, required: true },
    l_saburraForma: { type: String, required: true },
    l_saburraSublingual: { type: String, required: true },
    caracteres: [{
        caracter: { type: String, required: true }
    }],
    p_profundidad: [{
        normal: { type: String, required: true },
        anormal: { type: String, required: true },
    }],
    p_velocidad: [{
        normal: { type: String, required: true },
        anormal: { type: String, required: true },
    }],
    p_intensidad: [{
        normal: { type: String, required: true },
        anormal: { type: String, required: true },
    }],
    p_amplitud: [{
        normal: { type: String, required: true },
        anormal: { type: String, required: true },
    }],
    p_largo: [{
        normal: { type: String, required: true },
        anormal: { type: String, required: true },
    }],
    p_ritmo: [{
        normal: { type: String, required: true },
        anormal: { type: String, required: true },
    }],
    p_observacion: { type: String, required: true }

});

module.exports = mongoose.model('SubFichaAcupuntura', diagnosticoAcupunturaSchema);