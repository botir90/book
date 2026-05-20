const { Router } = require('express');
const { getQuotesByBook } = require('../controller/quote.controller');

const quoteRouter = Router();

quoteRouter.get('/books/:bookId/quotes', getQuotesByBook);

module.exports = quoteRouter;