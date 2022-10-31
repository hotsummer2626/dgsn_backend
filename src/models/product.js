const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  imgSrc: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  expireDate: {
    type: String,
    required: true,
  },
});

module.exports = model("Product", schema);
