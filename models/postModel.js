const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema(
  {
    titulo: { type: String },
    descripcion: { type: String },
    code: { type: String },
    images: [{ type: String }],
    user: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
