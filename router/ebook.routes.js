const { Router } = require('express');
const { addEbook, getEbooksByBook, getEbookUrl, updateEbook } = require('../controller/ebook.controller');
const { protect, authorize } = require('../middleware/auth.protect.middleware');

const ebookRouter = Router();

ebookRouter.post('/ebooks', protect, authorize('admin'), addEbook);
ebookRouter.get('/books/:bookId/ebooks', getEbooksByBook);
ebookRouter.get('/ebooks/:id/url', getEbookUrl);
ebookRouter.put('/ebooks/:id', protect, authorize('admin'), updateEbook);
module.exports = ebookRouter;