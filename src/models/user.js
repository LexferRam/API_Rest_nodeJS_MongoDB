const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//un esquema es una estructura de una coleccion(atributos de una collection)

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "car",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
