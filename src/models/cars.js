const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  seller: {
    type: Schema.Types.ObjectId, //hace referencia mediante el id del usuario asociado
    ref: "user", //hace referencia al modelo con que se relaciona
  },
});

module.exports = mongoose.model("car", carSchema);
