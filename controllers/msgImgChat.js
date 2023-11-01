const { response } = require('express');
const MsgImgChat = require('../models/MsgImgChat');

// MSGIMGCHAT
const crearMsgImgChat = async(req, res = response) => {
    const msgImgChat = new MsgImgChat ({
        nickname:  req.body.nickname,
        roomname:  req.body.roomname,
        message:   req.body.message,
        img:       req.body.img
    });
    MsgImgChat.create( msgImgChat ).then(() => {
    res.json({
        ok: true,
        msgImgChat
    });
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
};

const findAll = async(req, res = response ) => {
    const message = req.query.message;
    var condition = message ? { message: { $regex: new RegExp(message), $options: "i" } } : {};
    MsgImgChat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

const findOne = async(req, res = response ) => {
  const _id = req.params._id;
  MsgImgChat.findById(_id)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found Tutorial with id " + _id });
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Tutorial with id=" + _id });
  });
};
  
const deleteMsgImgChat = async(req, res = response ) => {
    const _id = req.params._id;
    MsgImgChat.findByIdAndRemove(_id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${_id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + _id
      });
    });
  
};
  
const deleteAllMsgImgChat = async(req, res = response ) => {
    MsgImgChat.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all tutorials."
        });
    });
};

module.exports = {
    crearMsgImgChat,
    findAll,
    findOne,
    deleteMsgImgChat,
    deleteAllMsgImgChat
}