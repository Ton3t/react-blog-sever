const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));

app.use("/posts", require("./routers/postRouter"));

// CONECTAR A MONGODB

mongoose.connect(process.env.MDB_CONNECT_STRING).then(
    () => {console.log("Conectado a MONGODB")},
    err => {
        console.log(err);
    }
);
