const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  issueDate: { type: Date, required: true },
  certificatePath: { type: String, required: true } // Store path of the uploaded file
});

module.exports = mongoose.model('Certificate', certificateSchema);
