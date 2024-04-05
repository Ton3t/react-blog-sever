const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));

app.use("/posts", require("./routers/postRouter"));