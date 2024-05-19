const { Schema, model } = require ('mongoose');

const paymentSchema = Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'credit_card', 'debit_card'], required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
