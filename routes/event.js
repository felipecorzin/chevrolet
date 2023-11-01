const { Router } = require('express');
const { createEvent,findAll,findOne,
    updateEvent,deleteEvent } = require('../controllers/event');

const router = Router();

// Crear event
router.post('/createEvent',createEvent);
// Obtener todos los event
router.get('/findAll',findAll );
// Obtener un event por id
router.get('/:_id',findOne );
// Actualizar event por id
router.put('/:_id',updateEvent );
// Eliminar un event por id
router.delete('/:_id',deleteEvent );

module.exports = router;