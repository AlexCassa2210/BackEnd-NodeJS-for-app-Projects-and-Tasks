const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    //Extraer el email y pass del req
    const { email, password } = req.body;

    try {
        //Revisar que sea un usuairo registrado
        let usuario = await Usuario.findOne({ email }); 
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe.'});
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'La contraseña es incorrecta.'});
        }

        //Si todo es correcto, crear y firmar el jwt
        const payload = {
            usuario:{
                id: usuario.id
            }
        };
        //Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmación
            res.json({ token });

        });

    } catch (error) {
        console.log(error);
        console.log("Error validationResult");
    }
}

//Obtiene el usuario auth
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); //Con .select('-password'), me trae todo, menos eso
        res.json({usuario});
    } catch (error) {
        console.log(error);
        console.log("Error 500");
        return res.status(500).json({msg: 'Hubo un error'});
    }
}