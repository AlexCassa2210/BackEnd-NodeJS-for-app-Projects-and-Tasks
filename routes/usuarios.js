//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//Crear un usuariio
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('email', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 })
    ],
    usuarioController.crearUsuario
);

module.exports = router;