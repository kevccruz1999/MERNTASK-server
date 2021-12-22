const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    estado:{
        type:Boolean,
        default: false
    },
    creado:{
        type:Date,
        default:Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto' //Es el nombre del modelo de referencia
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);