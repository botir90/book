const { Schema, model } = require('mongoose');

const Ebook = new Schema({
  title: {
    type: String,
    required: [true, 'Elektron kitob nomi majburiy'],
  },
  pdfUrl: {
    type: String,
    required: [true, 'PDF URL majburiy'],
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

module.exports = model('Ebook', Ebook);