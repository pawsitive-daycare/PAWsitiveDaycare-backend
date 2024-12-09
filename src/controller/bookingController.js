
const express = require("express")
const { userModel } = require("../models/user")
const { PetProfile } = require("../models/petProfile")
const { bookingModel } = require("../models/booking")

// all bookings
const getAllbookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json ({message: error.message});
  }
};
// get a booking by user id
const getBooking = async (req,res) => {
  try{
    const bookings = await bookingModel.find({ user : req.param._id});
    if(!bookings) {
      return res.status(400).json({ message: "booking not found"});
    }
    res.status(200).json(bookings);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// create a booking
const makeBooking = async (req, res) => {
try {
    console.log("New booking coming in")
    const { user, service, date, pet } = req.body
    const userObject = await userModel.findOne({ _id: user })
    const petObject = await PetProfile.findOne({ _id: pet})
    const newBooking = { 
      user: userObject, 
      service: {
        name: service.name, 
        price: service.price
      }, 
      date: {
        date: date.date
      }, 
      pet: petObject
    }
      const savedBooking = await bookingModel.create(newBooking)
      console.log("New booking created : " + savedBooking)
    res.status(201).send(savedBooking)
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  }

// update a booking
const updateBooking = async (req, res) => {
  const { user, service, date, pet } = req.body;
  try{
    const bookingToUpdate = await bookingModel.findById(req.params.id);
    if (!bookingToUpdate) {
      return res.status(400).json({ message: "Booking not found" });
    }
    const userObject = await userModel.findOne({ _id: user })
    const petObject = await PetProfile.findOne({ _id: pet})

    bookingToUpdate.user = userObject;
    bookingToUpdate.service = {
      name: service.name, 
      price: service.price
    };
    bookingToUpdate.date = {
      date: date.date
    }
    bookingToUpdate.pet = petObject;
    
    await bookingToUpdate.save();
    res.status(200).json({message: "booking updated successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// delete a booking