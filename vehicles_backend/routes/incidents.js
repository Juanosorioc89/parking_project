const { Router } = require('express');
const Incident = require('../models/Incident');

const router = Router();

// Registrar novedad
router.post('/', async (req, res) => {
  const { vehicleId, description } = req.body;
  try {
    const incident = new Incident({ vehicleId, description });
    await incident.save();
    res.status(201).send('Novedad registrada');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Obtener novedades
router.get('/', async (req, res) => {
  try {
    const incidents = await Incident.find().populate('vehicleId');
    res.status(200).json(incidents);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
