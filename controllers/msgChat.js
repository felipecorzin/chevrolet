const { response } = require('express');
const MsgChat = require('../models/MsgChat');

// MSGCHAT
const crearMsgChat = async(req, res = response) => {
    const msgChat = new MsgChat ({
        nickname:  req.body.nickname,
        roomname:  req.body.roomname,
        message:   req.body.message,
    });
    MsgChat.create( msgChat ).then(() => {
    res.json({
        ok: true,
        msgChat
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
    MsgChat.find(condition)
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
  MsgChat.findById(_id)
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
  
const deleteMsgChat = async(req, res = response ) => {
    const _id = req.params._id;
    MsgChat.findByIdAndRemove(_id, { useFindAndModify: false })
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
  
const deleteAllMsgChat = async(req, res = response ) => {
    MsgChat.deleteMany({})
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
    crearMsgChat,
    findAll,
    findOne,
    deleteMsgChat,
    deleteAllMsgChat
}