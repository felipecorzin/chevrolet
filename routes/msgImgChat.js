const { Router } = require('express');
const { crearMsgImgChat,findAll,
    findOne,deleteMsgImgChat,
    deleteAllMsgImgChat } = require('../controllers/msgImgChat');

const router = Router();

/*----- MSGIMGCHAT -----*/
// Crear msgImgChat
router.post('/crearMsgImgChat',crearMsgImgChat);
// Obtener todos los msgImgChat
router.get('/findAll',findAll );
// Obtener un msgImgChat por id
router.get('/:_id',findOne );
// Eliminar un msgImgChat por id
router.delete('/:_id',deleteMsgImgChat );
// Eliminar todos los msgImgChat
router.delete('/deleteAll',deleteAllMsgImgChat );

module.exports = router;