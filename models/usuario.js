const {Schema,model} = require('mongoose');

const userSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El Nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true    
    },
    google:{
        type:Boolean,
        default:false
    },
});


module.exports = model('Usuario',userSchema);