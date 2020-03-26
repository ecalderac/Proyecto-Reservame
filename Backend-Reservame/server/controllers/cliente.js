const express = require('express');
const Cliente = require('../models/cliente');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

//Crear un nuevo cliente o ficha cliente
app.post('/cliente', verificaToken, function(req, res) {

    let body = req.body;

    let cliente = new Cliente({

        nombre: body.nombre,
        rut: body.rut,
        email: body.email,
        edad: body.edad,
        genero: body.genero,
        telefono: body.telefono,
        fechaNacimiento: body.fechaNacimiento,
        peso: body.peso,
        altura: body.altura,
        alergias: body.alergias,
        enfermedad: body.enfermedad,
        profesion: body.profesion

    });

    cliente.save((err, clienteDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cliente: clienteDB
        });

    });

});

//Actualizar cliente
app.put('/cliente/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Cliente.findByIdAndUpdate(id, body, { context: 'query', new: true, runValidators: true }, (err, clienteActualizado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });

        } else {

            if (!clienteActualizado) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se ha actualizado el cliente'
                    }
                });

            } else {

                res.json({
                    ok: true,
                    mensaje: 'cliente actualizado',
                    cliente: clienteActualizado
                });

            }

        }

    });

});

//Obtener todos los clientes
app.get('/clientes', verificaToken, function(req, res) {

    Cliente.find({})
        .exec((err, clientes) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Cliente.count((err, conteo) => {

                res.json({
                    ok: true,
                    clientes,
                    totalCientes: conteo
                });

            });

        });

});

//Obtener un Cliente
app.get('/cliente/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Cliente.findById(id)
        .exec((err, clienteDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!clienteDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID del cliente no existe'
                    }
                });
            }

            res.json({
                ok: true,
                cliente: clienteDB
            });

        });

});

module.exports = app;