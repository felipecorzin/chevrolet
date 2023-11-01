const { Router } = require('express');
const { createCar,findAll,findOne,updateCar,
    deleteCar,deleteAll } = require('../controllers/car');

const router = Router();

// Crear plan
router.post('/createCar',createCar);
// Obtener todos los planes
router.get('/findAll',findAll );
// Obtener un plan por id
router.get('/:_id',findOne );
// Actualizar car por id
router.put('/:_id',updateCar );
// Eliminar un plan por id
router.delete('/:_id',deleteCar );
// Eliminar todos los planes
router.delete('/deleteAll',deleteAll );

module.exports = router;