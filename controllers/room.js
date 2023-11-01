const { response } = require('express');
const Room = require('../models/Room');

// ROOM
const crearRoom = async(req, res = response) => {
    const room = new Room ({
        roomname:    req.body.roomname,
        desc:        req.body.desc,
        img:         req.body.img,
    });
    Room.create( room ).then(() => {
    res.json({
        ok: true,
        room
    });
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
};

const findAll = async(req, res = response ) => {
    const roomname = req.query.message;
    var condition = roomname ? { roomname: { $regex: new RegExp(roomname), $options: "i" } } : {};
    Room.find(condition)
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
    const roomname = req.params.roomname;
    Room.findById(roomname)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + roomname });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + roomname });
    });
};
  
const deleteRoom = async(req, res = response ) => {
    const _id = req.params._id;
    Room.findByIdAndRemove(_id, { useFindAndModify: false })
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
  
const deleteAllRoom = async(req, res = response ) => {
    Room.deleteMany({})
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
    crearRoom,
    findAll,
    findOne,
    deleteRoom,
    deleteAllRoom
}