const { Router } = require('express');
const { crearMsgChat,findAll,findOne,
    deleteMsgChat,deleteAllMsgChat } = require('../controllers/msgChat');

const router = Router();

/*----- MSGCHAT -----*/
// Crear msgChat
router.post('/crearMsgChat',crearMsgChat);
// Obtener todos los msgChat
router.get('/findAll',findAll );
// Obtener un msgChat por id
router.get('/:_id',findOne );
// Eliminar un msgChat por id
router.delete('/:_id',deleteMsgChat );
// Eliminar todos los msgChats
router.delete('/deleteAll',deleteAllMsgChat );
module.exports = router;