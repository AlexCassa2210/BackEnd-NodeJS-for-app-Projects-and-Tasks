const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crear un usuariio
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoController.crearProyecto
);

router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//Actuliza proyecto
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyecto
);

//Elimina proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminaProyecto
);

module.exports = router;