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

module.exports = router;
