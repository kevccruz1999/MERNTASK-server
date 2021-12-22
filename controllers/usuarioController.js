const Usuario= require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
exports.crearUsuario = async (req, res)=>{


    // revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }
    // extraer email y password
    const { email, password} = req.body;


    try {

        //Revisar que el usuario sea unico

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El Usuario ya existe'});
        }

        //crea el nuevo usuario

        usuario = new Usuario(req.body);

        // Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };


        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600 // 1hora
        }, (error,token)=>{
            if (error) throw error;
        
            //Mensaje de confirmacion
            res.json({token});
        });

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        
        //guarda usuario
        await usuario.save();

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}