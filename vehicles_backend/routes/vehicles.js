const { Router } = require('express');
const Vehicle = require('../models/Vehicle');
const Cell = require('../models/Cell');

const router = Router();

// Registrar entrada de vehículo
router.post('/entry', async (req, res) => {
  const { plate, brand, model, color, cellId, userId } = req.body;
  try {
    const cell = await Cell.findById(cellId);
    if (cell.status !== 'available') return res.status(400).send('Celda no disponible');

    const vehicle = new Vehicle({ plate, brand, model, color, entryTime: new Date(), cellId, userId });
    await vehicle.save();

    cell.status = 'occupied';
    await cell.save();

    res.status(201).send('Vehículo registrado');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Registrar salida de vehículo
router.post('/exit', async (req, res) => {
  const { plate } = req.body;
  try {
    const vehicle = await Vehicle.findOne({ plate, exitTime: null });
    if (!vehicle) return res.status(400).send('Vehículo no encontrado o ya ha salido');

    vehicle.exitTime = new Date();
    await vehicle.save();

    const cell = await Cell.findById(vehicle.cellId);
    cell.status = 'available';
    await cell.save();

    // Calcular el tiempo de permanencia y el costo (simplificado)
    const duration = (vehicle.exitTime - vehicle.entryTime) / (1000 * 60 * 60); // Duración en horas
    const cost = duration * 10; // Asumimos una tarifa de 10 unidades monetarias por hora
    res.status(200).send(`Vehículo ha salido. Tiempo: ${duration.toFixed(2)} horas. Costo: ${cost.toFixed(2)}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
