require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileUpload");
const ContactModel = require("./schema/contactSchema");
const FavoriteModel = require("./schema/favoriteSchema");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  DATABASE CONNECTION
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => app.listen(port))
  .catch((err) => console.log(err.message));

// ROUTE
app.get("/getUser", async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/add_contact", async (req, res) => {
  const { name, position, status, location, tags, image } = req.body;
  try {
    const newContact = new ContactModel({
      name,
      position,
      status,
      location,
      tags,
      image,
    });

    const savedContact = await newContact.save();
    res.status(201).send(savedContact);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/deleteContact", async (req, res) => {
  const contactId = req.body.contactId;
  try {
    const allContact = await ContactModel.findByIdAndDelete(contactId);
    res.status(200).send(allContact);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/updateContact", async (req, res) => {
  const { id, name, position, status, location, tags, image } = req.body;

  try {
    if (image) {
      const updatedContact = await ContactModel.findByIdAndUpdate(
        id,
        {
          name,
          position,
          status,
          location,
          tags,
          image,
        },
        { new: true }
      );
      res.status(200).send(updatedContact);
    } else {
      const updatedContact = await ContactModel.findByIdAndUpdate(
        id,
        {
          name,
          position,
          status,
          location,
          tags,
        },
        { new: true }
      );
      res.status(200).send(updatedContact);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/getFavContacts", async (req, res) => {
  const { email } = req.body;
  try {
    const favContacts = await FavoriteModel.find({ email: email });
    res.status(200).send(favContacts);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/addFavContacts", async (req, res) => {
  const { email, contactData } = req.body;
  try {
    const newFavorite = new FavoriteModel({
      email: email,
      contact: contactData,
    });

    const savedContact = await newFavorite.save();
    res.status(201).send(savedContact);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/deleteFavorite", async (req, res) => {
  const contactId = req.body.contactId;
  try {
    const allContact = await FavoriteModel.findByIdAndDelete(contactId);
    res.status(200).send(allContact);
  } catch (error) {
    res.status(400).send(error);
  }
});
