//Rutas para auth usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//INiciar sesión
// api/usuarios
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('email', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 })
    ],
    authController.autenticarUsuario
);

//obtener el usuario auth
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;