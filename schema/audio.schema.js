const { Schema, model } = require('mongoose');

const Audio = new Schema({
  title: {
    type: String,
    required: [true, 'Audio nomi majburiy'],
  },
  audioUrl: {
    type: String,
    required: [true, 'Audio URL majburiy'],
  },
  duration: {
    type: String,
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

module.exports = model('Audio', Audio);