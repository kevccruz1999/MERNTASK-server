// Rutas para autenticar usuarios
const express = require('express')
const router = express.Router();
const {check} = require('express-validator');
const authcontroller = require('../controllers/authController');
const auth = require('./../middleware/auth')
//iniciar sesion
// api/auth
router.post('/',
    // [
    //     check('email','Agrega un email válido').isEmail(),
    //     check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    // ],
    authcontroller.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get('/',
    auth,
    authcontroller.usuarioAutenticado
)
module.exports = router;