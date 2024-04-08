const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");

// recibir posts

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500);
  }
});

// posts para  cada usuario

router.get("/userposts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user });
    res.json(posts);
  } catch (error) {
    res.status(500);
  }
});

// enviar posts

router.post("/", auth, async (req, res) => {
  try {
    const { titulo, descripcion, code, images } = req.body;

    if (!titulo && !descripcion && !code) {
      return res
        .status(400)
        .json({ errorMessage: "Debe rellenar todos los campos." });
    }

    const newPost = new Post({
      titulo,
      descripcion,
      code,
      images,
      user: req.user,
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).send();
  }
});

// borrar posts de la base de datos

router.delete("/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({ errorMessage: "No ha enviado ningún ID." });
    }

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(400).json({
        errorMessage:
          "El ID no existe en la base de datos. Porfavor contacte con un Programador.",
      });
    }

    if (existingPost.user.toString() !== req.user) {
      return res.status(401).json({ errorMessage: "No estás autorizado." });
    }

    await existingPost.deleteOne();
    res.json(existingPost);
  } catch (error) {
    res.status(500).send();
  }
});

// modificar datos de los posts

router.put("/:id", auth, async (req, res) => {
  try {
    const { titulo, descripcion, code, images } = req.body;
    const postId = req.params.id;

    if (!titulo && !descripcion && !code) {
      return res
        .status(400)
        .json({ errorMessage: "Debes modificar algún campo." });
    }
    if (!postId) {
      return res.status(400).json({ errorMessage: "No ha enviado ningún ID." });
    }

    const originalPost = await Post.findById(postId);
    if (!originalPost) {
      return res.status(400).json({
        errorMessage:
          "No se ha encontrado ningún fragmento nuevo con este ID. Porfavor contacte con un Programador.",
      });
    }

    if (originalPost.user.toString() !== req.user) {
      return res.status(401).json({ errorMessage: "No estás autorizado." });
    }

    originalPost.titulo = titulo;
    originalPost.descripcion = descripcion;
    originalPost.code = code;
    originalPost.images = images;

    const savedPost = await originalPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
