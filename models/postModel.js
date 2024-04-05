const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String },
    descripcion: { type: String },
    code: { type: String },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;