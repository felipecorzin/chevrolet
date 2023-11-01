const { response } = require('express');
const Event = require('../models/Event');

const createEvent = async(req, res = response) => {
    const event = new Event  ({
      title:  req.body.title,
      desc:   req.body.desc,
      start:  req.body.start,
      end:    req.body.end,
      allDay: req.body.allDay
    });
    // Save Evento in the database
    Event .create( event ).then(() => {
    res.json({
        ok: true,
        event 
    });
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
};

const findAll = async(req, res = response ) => {
    const title = req.query.name;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Event .find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });

};

const findOne = async(req, res = response ) => {
    const _id = req.params._id;
    Event .findById(_id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Event  with id " + _id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Event with id=" + _id });
    });

};

const updateEvent = async(req, res = response ) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    const _id = req.params._id;
    
    Event .findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Cannot update Event with id=${_id}. Maybe Event was not found!`
        });
        } else res.send({ message: "Event was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
        message: "Error updating Event with id=" + _id
        });
    });

};

const deleteEvent = async(req, res = response ) => {
    const _id = req.params._id;

    Event .findByIdAndRemove(_id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event with id=${_id}. Maybe Event was not found!`
        });
      } else {
        res.send({
          message: "Event was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + _id
      });
    });

};

module.exports = {
    createEvent,
    findAll,
    findOne,
    updateEvent,
    deleteEvent
}