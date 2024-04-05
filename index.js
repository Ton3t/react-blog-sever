const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));