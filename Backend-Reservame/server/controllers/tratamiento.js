const express = require('express');
const Tratamiento = require('../models/tratamiento');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

//Crear tratamiento
app.post('/tratamiento', verificaToken, function(req, res) {

    let body = req.body;

    let tratamiento = new Tratamiento({

        nombre: body.nombre,
        precio: body.precio,
        nroSesiones: body.nroSesiones,
        precioSesion: body.precioSesion

    });

    tratamiento.save((err, tratamientoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tratamiento: tratamientoDB
        });

    });

});

//Actualizar tratamiento
app.put('/tratamiento/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Tratamiento.findByIdAndUpdate(id, body, { context: 'query', new: true, runValidators: true }, (err, tratamientoActualizado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });

        } else {

            if (!tratamientoActualizado) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se ha actualizado el tratamiento'
                    }
                });

            } else {

                res.json({
                    ok: true,
                    mensaje: 'Tratamiento actualizado',
                    tratamiento: tratamientoActualizado
                });

            }

        }

    });

});

//Obtener todos los tratamientos
app.get('/tratamientos', verificaToken, function(req, res) {

    Tratamiento.find({})
        .exec((err, tratamientos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Tratamiento.count((err, conteo) => {

                res.json({
                    ok: true,
                    tratamientos,
                    totalTratamientos: conteo
                });

            });

        });

});

//Obtener un tratamiento
app.get('/tratamiento/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Tratamiento.findById(id)
        .exec((err, tratamientoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!tratamientoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID del tratamiento no existe'
                    }
                });
            }

            res.json({
                ok: true,
                tratamiento: tratamientoDB
            });

        });

});

//Eliminar tratamiento ?

module.exports = app;