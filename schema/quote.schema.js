const { Schema, model } = require('mongoose');

const Quote = new Schema({
  text: {
    type: String,
    required: [true, 'Iqtibos matni majburiy'],
    minlength: [5, 'Iqtibos kamida 5 ta belgidan iborat bo\'lishi kerak'],
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Kitob majburiy'],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = model('Quote', Quote);