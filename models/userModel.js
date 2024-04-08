const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    email: { type: String },
    passwordHash: { type: String },
    imagen: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
