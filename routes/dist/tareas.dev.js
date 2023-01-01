"use strict";

var express = require('express');

var router = express.Router();

var tareaController = require('../controllers/tareaController');

var auth = require('../middleware/auth');

var _require = require('express-validator'),
    check = _require.check; //crear una tarea
// api/tareas


router.post('/', auth, [check('nombre', 'El nombre es obligatorio').not().isEmpty(), check('proyecto', 'El proyecto es obligatorio').not().isEmpty()], tareaController.crearTarea); //Obtener las tareas por proyecto

router.get('/', auth, tareaController.obtenerTareas); //Actualizar tarea

router.put('/:id', auth, tareaController.actualizarTarea); //Eliminar una tarea

router["delete"]('/:id', auth, tareaController.eliminarTarea);
module.exports = router;