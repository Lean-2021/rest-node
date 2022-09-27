const {Schema,model} = require ('mongoose');


const categorySchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        required:true,
        default:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

categorySchema.methods.toJSON = function(){
    const {__v,estado,...category} = this.toObject();
    return category;
}

module.exports=model('Category',categorySchema);