const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    resumido: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);