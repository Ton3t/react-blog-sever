const router = require("express").Router();
const Post = require("../models/postModel");

// recibir posts

router.get("/", (req, res) => {
    res.send("Post test");
});

// enviar posts

router.post("/", async(req, res) => {
    const { titulo, descripcion, code } = req.body;

    const newPost = new Post({
        titulo, descripcion, code
    });

    newPost.save();
});

module.exports = router;
