const express = require('express');
const Consulta = require('../models/consulta');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

//Crear consulta
app.post('/consulta', verificaToken, function(req, res) {

    let body = req.body;

    let consulta = new Consulta({

        estado: body.estado,
        fecha: body.fecha,
        hora: body.hora,
        motivoConsulta: body.motivoConsulta,
        usuario: req.usuario._id,
        cliente: body.cliente

    });

    consulta.save((err, consultaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            consulta: consultaDB
        });

    });

});

//Actualizar consulta
app.put('/consulta/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Consulta.findByIdAndUpdate(id, body, { context: 'query', new: true, runValidators: true }, (err, consultaActualizada) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });

        } else {

            if (!consultaActualizada) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se ha actualizado la consulta'
                    }
                });

            } else {

                res.json({
                    ok: true,
                    mensaje: 'Consulta actualizada',
                    consulta: consultaActualizada
                });

            }

        }

    });

});

//Obtener todos las consultas
app.get('/consultas', verificaToken, function(req, res) {

    Consulta.find({})
        .populate('usuario')
        .populate('cliente')
        .exec((err, consultas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Consulta.count((err, conteo) => {

                res.json({
                    ok: true,
                    consultas,
                    totalConsultas: conteo
                });

            });

        });

});

//Obtener una Consulta
app.get('/consulta/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Consulta.findById(id)
        .populate('usuario')
        .populate('cliente')
        .exec((err, consultaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!consultaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID de la consulta no existe'
                    }
                });
            }

            res.json({
                ok: true,
                consulta: consultaDB
            });

        });

});

//Cancelar consulta
app.delete('/consulta/:id', verificaToken, function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Consulta.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, consultaCancelada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!consultaCancelada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Consulta no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            mensaje: 'Consulta cancelada',
            consulta: consultaCancelada
        });

    })

});


module.exports = app;