const router = require("express").Router();
const Post = require("../models/postModel");

// recibir posts

router.get("/", (req, res) => {
  res.send("Post test");
});

// enviar posts

router.post("/", async (req, res) => {
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
      images
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).send();
  }
});

// borrar posts de la base de datos

router.delete("/:id", async(req, res) => {

    try {
        const postId = req.params.id;

    if(!postId) {
        return res
        .status(400)
        .json({ errorMessage: "No ha enviado ningún ID." });
    }

    const existingPost = await Post.findById(postId);
    if(!existingPost) {
        return res
        .status(400)
        .json({ errorMessage: "El ID no existe en la base de datos. Porfavor contacte con un Programador." });
    }

    await existingPost.deleteOne();
    res.json(existingPost);
    } catch (error) {
        res.status(500).send();
    }
});

// modificar datos de los posts

router.put("/:id", async(req, res) => {
    try {
        const { titulo, descripcion, code, images } = req.body;
    const postId = req.params.id;

    if(!titulo && !descripcion && !code) {
        return res
        .status(400)
        .json({ errorMessage: "Debe rellenar todos los campos." });
    }
    if(!postId) {
        return res
        .status(400)
        .json({ errorMessage: "No ha enviado ningún ID." });
    }

    const originalPost = await Post.findById(postId);
    if(!originalPost) {
        return res.status(400).json({errorMessage: "No se ha encontrado ningún fragmento nuevo con este ID. Porfavor contacte con un Programador."})
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
