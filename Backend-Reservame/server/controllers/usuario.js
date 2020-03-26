const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

//Crear un nuevo usuario
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        rut: body.rut,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        telefono: body.telefono,
        rol: body.rol,
        profesion: body.profesion

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});


//Actualizar Usuario
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'rut', 'email', 'telefono', 'rol', 'profesion', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { context: 'query', new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

//Obtener todos los usuarios
app.get('/usuarios', function(req, res) {

    Usuario.find({})
        .exec((err, usuarios) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Usuario.count((err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    totalUsuarios: conteo
                });

            });

        });

});

//Obtener un Usuario
app.get('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findById(id)
        .exec((err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID del usuario no existe'
                    }
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });

        });

});

//Eliminar un usuario (Borrado logico)
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            mensaje: 'Usuario eliminado',
            usuario: usuarioBorrado
        });

    })

});


module.exports = app;