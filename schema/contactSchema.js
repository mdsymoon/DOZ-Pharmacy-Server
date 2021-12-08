const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const ContactModel = model("contacts", contactSchema);
module.exports = ContactModel;
