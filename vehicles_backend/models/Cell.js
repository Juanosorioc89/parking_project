const { Schema, model } = require ('mongoose');

const cellSchema = Schema({
  identifier: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'occupied', 'out_of_service'], default: 'available' }
});

module.exports = mongoose.model('Cell', cellSchema);
