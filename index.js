const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));

app.use("/posts", require("./routers/postRouter"));

// CONECTAR A MONGODB

mongoose
  .connect(
    "mongodb+srv://tonet:aDgAH4BavS5YGKCO@snipet-manager.dq5intb.mongodb.net/?retryWrites=true&w=majority&appName=Snipet-manager"
  )
  .then(console.log("Conectado a MONGODB"));
