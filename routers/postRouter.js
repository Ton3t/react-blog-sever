const router = require("express").Router();
const Post = require("../models/postModel");

// recibir posts

router.get("/", (req, res) => {
  res.send("Post test");
});

// enviar posts

router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, code } = req.body;

    if (!titulo && !descripcion && !code) {
      return res
        .status(400)
        .json({ errorMessage: "Debe rellenar todos los campos." });
    }

    const newPost = new Post({
      titulo,
      descripcion,
      code,
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
