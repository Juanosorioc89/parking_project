const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
  const { name, identification, phone, email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, identification, phone, email, username, password: hashedPassword });
    await user.save();
    res.status(201).send('Usuario registrado');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Usuario no encontrado');
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Contraseña incorrecta');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
