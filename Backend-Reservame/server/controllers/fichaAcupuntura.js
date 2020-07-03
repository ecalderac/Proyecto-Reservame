const express = require('express');
const FichaAcupuntura = require('../models/fichaAcupuntura');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

//Crear ficha acupuntura
app.post('/fichaacupuntura', verificaToken, function(req, res) {

    let body = req.body;

    let fichaAcupuntura = new FichaAcupuntura({

        estadoPaciente: body.estadoPaciente,
        descripcionEstado: body.descripcionEstado,
        antecedentesPatologicos: body.antecedentesPatologicos,
        antecedentesFamiliares: body.antecedentesFamiliares,
        medicacion: body.medicacion,
        consumos: body.consumos,
        actividadFisica: body.actividadFisica,
        tratamiento: body.tratamiento
            //diagnosticoAcupuntura: body.diagnosticoAcupuntura

    });

    fichaAcupuntura.save((err, fichaAcupunturaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            fichaAcupuntura: fichaAcupunturaDB
        });

    });

});

//Actualizar ficha acupuntura
app.put('/fichaacupuntura/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    FichaAcupuntura.findByIdAndUpdate(id, body, { context: 'query', new: true, runValidators: true }, (err, facupunturaDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });

        } else {

            if (!facupunturaDB) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se ha actualizado la ficha acupuntura'
                    }
                });

            } else {

                res.json({
                    ok: true,
                    mensaje: 'Ficha acupuntura actualizada',
                    fichaacupuntura: facupunturaDB
                });

            }

        }

    });

});

//Obtener todas las fichas de acupuntura
app.get('/fichasacupunturas', verificaToken, function(req, res) {

    FichaAcupuntura.find({})
        .populate('tratamiento')
        //.populate('diagnosticoAcupuntura')
        .exec((err, facupunturaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            FichaAcupuntura.count((err, conteo) => {

                res.json({
                    ok: true,
                    facupunturaDB,
                    totalfacupuntura: conteo
                });

            });

        });

});

//Obtener una Ficha Acupuntura
app.get('/fichaacupuntura/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    FichaAcupuntura.findById(id)
        .populate('tratamiento')
        //.populate('diagnosticoAcupuntura')
        .exec((err, fichaacupuntursDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!fichaacupuntursDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID de la ficha acupuntura no existe'
                    }
                });
            }

            res.json({
                ok: true,
                consulta: fichaacupuntursDB
            });

        });

});

//Eliminar tiene?

module.exports = app;