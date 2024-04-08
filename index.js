const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));

app.use("/posts", require("./routers/postRouter"));
app.use("/auth", require("./routers/userRouter"));

// CONECTAR A MONGODB

mongoose.connect(process.env.MDB_CONNECT_STRING).then(
    () => {console.log("Conectado a MONGODB")},
    err => {
        console.log(err);
    }
);
