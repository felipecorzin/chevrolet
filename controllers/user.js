const { response } = require('express');
const User = require('../models/User');

const findAll = async(req, res = response ) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    User.find(condition)
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
    User.findById(_id)
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

const updateUsuario = async(req, res = response ) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    const _id = req.params._id;
    
    User.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Cannot update Tutorial with id=${_id}. Maybe Tutorial was not found!`
        });
        } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating Tutorial with id=" + _id
        });
    });

};

const deleteUsuario = async(req, res = response ) => {
    const _id = req.params._id;

    User.findByIdAndRemove(_id, { useFindAndModify: false })
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

module.exports = {
    findAll,
    findOne,
    updateUsuario,
    deleteUsuario
}