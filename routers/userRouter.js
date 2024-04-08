const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre, email, password, passwordVerify, imagen } = req.body;

    // validaciones de los campos

    if (!nombre || !email || !password || !passwordVerify || !imagen) {
      return res.status(400).json({
        errorMessage: "Debes rellenar todos los campos.",
      });
    }

    if (password < 6) {
      return res.status(400).json({
        errorMessage: "El password minimo tiene que tener 6 carácteres.",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Verifique el password.",
      });
    }

    const existingName = await User.findOne({ nombre });

    if (existingName) {
      return res.status(400).json({
        errorMessage: "El nombre de usuario ya existe.",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        errorMessage: "El email ya existe.",
      });
    }

    // hash password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // hash email

    const emailHash = await bcrypt.hash(email, salt);

    const newUser = new User({
      nombre,
      email: emailHash,
      passwordHash,
      imagen,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true}).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/login", async(req, res) => {
  try {
    const { nombre, password } = req.body;

    if(!nombre || !password) {
      return res.status(400).json({
        errorMessage: "Porfavor rellene todos los campos."
      });
    }

    const existingUser = await User.findOne(nombre);
    if(!existingUser) {
      return res.status(401).json({
        errorMessage: "El nombre de usuario no se encuentra en la base de datos."
      });
    }

    const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);

    if(!correctPassword) {
      return res.status(401).json({
        errorMessage: "Password incorrecto, verifique su contraseña."
      });
    }

    const token = jwt.sign({
      id: existingUser._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {httpOnly: true}).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if(!token) {
      return res.json(null);
    }

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    res.json(validatedUser.id);
  } catch (err) {
    return res.json(null);
  }
});

router.get("/logOut", (req, res) => {
  try {
    return res.clearCookie("token").send();
  } catch (err) {
    return res.json(null);   
  }
});

module.exports = router;
