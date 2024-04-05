const router = require("express").Router();

// recibir posts

router.get("/", (req, res) => {
    res.send("Post test");
});

// enviar posts

router.post("/", async(req, res) => {
    const { titulo, descripcion, code } = req.body;
});

module.exports = router;
