"use strict";

var express = require('express');

var router = express.Router();

var proyectoController = require('../controllers/proyectoController');

var auth = require('../middleware/auth');

var _require = require('express-validator'),
    check = _require.check; //Crear un usuariio
// api/proyectos


router.post('/', auth, [check('nombre', 'El nombre es obligatorio').not().isEmpty()], proyectoController.crearProyecto);
router.get('/', auth, proyectoController.obtenerProyectos); //Actuliza proyecto

router.put('/:id', auth, [check('nombre', 'El nombre es obligatorio').not().isEmpty()], proyectoController.actualizarProyecto); //Elimina proyecto

router["delete"]('/:id', auth, proyectoController.eliminaProyecto);
module.exports = router;