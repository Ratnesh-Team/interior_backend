
const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    CustomerID: {
        type: String,
        required: true,
      },
  CustomerName: {
    type: String,
    required: true,
  },

  items: [
   
  ]
   
  ,
  TotalAmount: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
