const { Router } = require('express');
const Payment = require('../models/Payment');
const Vehicle = require('../models/Vehicle');

const router = Router();

// Registrar pago
router.post('/', async (req, res) => {
  const { vehicleId, amount, method } = req.body;
  try {
    const payment = new Payment({ vehicleId, amount, method });
    await payment.save();
    res.status(201).send('Pago registrado');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Obtener pagos
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('vehicleId');
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
