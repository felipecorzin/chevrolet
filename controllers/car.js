const { response } = require('express');
const Car   = require('../models/Car');

const createCar = async(req, res = response) => {
    const car = new Car ({
      title:  req.body.title,
      desc:   req.body.desc,
      img:    req.body.img,
    });
    // Save Evento in the database
    Car.create( car ).then(() => {
    res.json({
        ok: true,
        car 
    });
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
};

const findAll = async(req, res = response ) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Car.find(condition)
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
  Car.findById(_id)
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

const updateCar = async(req, res = response ) => {

  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
  }
  
  const _id = req.params._id;
  
  Car.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
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

const deleteCar = async(req, res = response ) => {
  const _id = req.params._id;
  Car.findByIdAndRemove(_id, { useFindAndModify: false })
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

const deleteAll = async(req, res = response ) => {
    Car.deleteMany({})
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
    createCar,
    findAll,
    findOne,
    updateCar,
    deleteCar,
    deleteAll
}