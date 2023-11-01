const { Router } = require('express');
const { crearRoom,findAll,findOne,
            deleteRoom,deleteAllRoom } = require('../controllers/room');

const router = Router();

// Crear plan
router.post('/crearRoom',crearRoom);
// Obtener todos los planes
router.get('/findAll',findAll );
// Obtener un plan por id
router.get('/:roomname',findOne );
// Eliminar un plan por id
router.delete('/:_id',deleteRoom );
// Eliminar todos los planes
router.delete('/deleteAllRoom',deleteAllRoom );

module.exports = router;