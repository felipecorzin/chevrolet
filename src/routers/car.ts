import { Router } from 'express';
import asyncHandler from 'express-async-handler';
const Car = require("../models/car");

const carRouter = Router();

carRouter.post('/create',asyncHandler(async (req,res) => {
  const newCar = new Car(req.body);
  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    res.status(500).json(err);
  }
}))

carRouter.get('/findAll',asyncHandler(async (req, res) => {
    const cars = await Car.find();
    res.send(cars);
  })
);

carRouter.get('/:userId',asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.userId);
  res.send(car);
})
);

carRouter.put('/:id',asyncHandler(async(req,res) => {
const id = req.params.id
const car = await Car.findByIdAndUpdate(id, req.body)  
 res.send(car)
})
);

carRouter.delete('/:id',asyncHandler(async(req,res) => {
const id = req.params.id
const car = await Car.findByIdAndDelete(id);  
 res.send(car)
}));

export default carRouter;