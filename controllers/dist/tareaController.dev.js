"use strict";

var Tarea = require('../models/Tarea');

var Proyecto = require('../models/Proyecto');

var _require = require('express-validator'),
    validationResult = _require.validationResult; //Crea una nueva tarea


exports.crearTarea = function _callee(req, res) {
  var errores, proyecto, existeProyecto, tarea;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //Revisar si hay errores
          errores = validationResult(req);

          if (errores.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errores: errores.array()
          }));

        case 3:
          _context.prev = 3;
          proyecto = req.body.proyecto;
          _context.next = 7;
          return regeneratorRuntime.awrap(Proyecto.findById(proyecto));

        case 7:
          existeProyecto = _context.sent;

          if (!existeProyecto) {
            res.status(404).json({
              msg: 'Proyecto no encontrado..'
            });
          } //Revisar si el proyecto actual pertenece al usuario auth


          if (!(existeProyecto.creador.toString() !== req.usuario.id)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            msg: 'No autorizado.'
          }));

        case 11:
          //Creamos la tarea
          tarea = new Tarea(req.body);
          _context.next = 14;
          return regeneratorRuntime.awrap(tarea.save());

        case 14:
          res.json({
            tarea: tarea
          });
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.status(500).send('Error en el servidor..');

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 17]]);
}; //Obtener las tareas de un proyecto


exports.obtenerTareas = function _callee2(req, res) {
  var errores, proyecto, existeProyecto, tareas;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //Revisar si hay errores
          errores = validationResult(req);

          if (errores.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errores: errores.array()
          }));

        case 3:
          _context2.prev = 3;
          //Extraer el proyecto y comprobar si existe
          //const { proyecto } = req.body;
          proyecto = req.query.proyecto; //porque estoy enviando params y así es como lo lee el controlador

          _context2.next = 7;
          return regeneratorRuntime.awrap(Proyecto.findById(proyecto));

        case 7:
          existeProyecto = _context2.sent;

          if (!existeProyecto) {
            res.status(404).json({
              msg: "Proyecto no encontrado.."
            });
          } //Revisar si el proyecto actual pertenece al usuario auth


          if (!(existeProyecto.creador.toString() !== req.usuario.id)) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            msg: "No autorizado."
          }));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(Tarea.find({
            proyecto: proyecto
          }).sort({
            creado: -1
          }));

        case 13:
          tareas = _context2.sent;
          //.sort para el orden
          res.json({
            tareas: tareas
          });
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);
          res.status(500).send("Error en el servidor..");

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 17]]);
}; //Actualizar la tarea


exports.actualizarTarea = function _callee3(req, res) {
  var _req$body, proyecto, nombre, estado, tarea, existeProyecto, nuevaTarea;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          //Extraer el proyecto y comprobar si existe
          _req$body = req.body, proyecto = _req$body.proyecto, nombre = _req$body.nombre, estado = _req$body.estado; //Si la tarea existe o no

          _context3.next = 4;
          return regeneratorRuntime.awrap(Tarea.findById(req.params.id));

        case 4:
          tarea = _context3.sent;

          if (tarea) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            msg: 'No existe esa tarea..'
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(Proyecto.findById(proyecto));

        case 9:
          existeProyecto = _context3.sent;

          if (!(existeProyecto.creador.toString() !== req.usuario.id)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            msg: "No autorizado."
          }));

        case 12:
          //Crear un objeto con la nueva info
          nuevaTarea = {};
          nuevaTarea.nombre = nombre;
          nuevaTarea.estado = estado; // Guardar la tarea

          _context3.next = 17;
          return regeneratorRuntime.awrap(Tarea.findOneAndUpdate({
            _id: req.params.id
          }, nuevaTarea, {
            "new": true
          }));

        case 17:
          tarea = _context3.sent;
          res.json({
            tarea: tarea
          });
          _context3.next = 25;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send('Hubo un error...');

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 21]]);
}; //Eliminar una tarea


exports.eliminarTarea = function _callee4(req, res) {
  var proyecto, tarea, existeProyecto;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          //Extraer el proyecto y comprobar si existe
          proyecto = req.query.proyecto; //Si la tarea existe o no

          _context4.next = 4;
          return regeneratorRuntime.awrap(Tarea.findById(req.params.id));

        case 4:
          tarea = _context4.sent;

          if (tarea) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: 'No existe esa tarea..'
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(Proyecto.findById(proyecto));

        case 9:
          existeProyecto = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(Tarea.findOneAndRemove({
            _id: req.params.id
          }));

        case 12:
          res.json({
            msg: 'Tarea eliminada.'
          });
          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send('Hubo un error...');

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; //Video 257 quedé