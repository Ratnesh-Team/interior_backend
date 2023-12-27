
const mongoose = require('mongoose');

const fileuploadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,

    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const fileUpload = mongoose.model('file', fileuploadSchema);

module.exports = fileUpload;
