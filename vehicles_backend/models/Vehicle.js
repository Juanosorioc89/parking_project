const { Schema, model } = require ('mongoose');

const vehicleSchema = Schema({
  plate: { type: String, required: true, unique: true },
  brand: String,
  model: String,
  color: String,
  entryTime: Date,
  exitTime: Date,
  cellId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cell' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
