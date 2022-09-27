const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

//obtener todos los productos
router.get('/');

//obtener producto por ID
router.get('/:id');

//crear un producto
router.post('/');


//Actualizar Producto segun su ID
router.put('/:id');


//Borrar producto segun sun ID
router.delete('/:id');

module.exports = router;
