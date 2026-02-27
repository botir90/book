const express = require('express');
const router = express.Router();


const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controller/author.controller');


const validate = require('../middleware/author.validator.middleware');
const { protect, authorize } = require('../middleware/auth.protect.middleware');


const { createAuthorValidation, updateAuthorValidation } = require('../validator/author.validator');


router.get('/', getAllAuthors);


router.get('/:id', getAuthorById);


router.post(
  '/',
  protect,
  authorize('admin'),
  validate(createAuthorValidation),
  createAuthor
);


router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateAuthorValidation),
  updateAuthor
);


router.delete('/:id', protect, authorize('admin'), deleteAuthor);

module.exports = router;
