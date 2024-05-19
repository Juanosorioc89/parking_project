const { Router } = require('express');
const Cell = require('../models/Cell');

const router = Router();

// Registrar celda
router.post('/', async (req, res) => {
  const { identifier } = req.body;
  try {
    const cell = new Cell({ identifier });
    await cell.save();
    res.status(201).send('Celda registrada');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Obtener celdas
router.get('/', async (req, res) => {
  try {
    const cells = await Cell.find();
    res.status(200).json(cells);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
