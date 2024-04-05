const router = require("express").Router();

// recibir posts

router.get("/", (req, res) => {
    res.send("Post test");
});

module.exports = router;
