const { Schema, model } = require("mongoose");
const favoriteSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  contact: {
      type: Object,
      required: true,
  }
});

const FavoriteModel = model("favorites", favoriteSchema);
module.exports = FavoriteModel;
