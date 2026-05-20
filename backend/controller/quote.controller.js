const Quote = require('../schema/quote.schema');
const CustomErrorhandler = require('../error/custom-error.handler');

const getQuotesByBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const quotes = await Quote.find({ book: bookId });

    if (!quotes.length) {
      throw CustomErrorhandler.NotFound('Bu kitob uchun iqtiboslar topilmadi');
    }

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuotesByBook };