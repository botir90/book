const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/book.controller");

const validate = require("../middleware/author.validator.middleware");
const {
  validateQuery,
  bookQueryValidation,
} = require("../middleware/book.validator.middleware");
const { protect, authorize } = require("../middleware/auth.protect.middleware");

const {
  createBookValidation,
  updateBookValidation,
} = require("../validator/book.validator");

router.get("/", validateQuery(bookQueryValidation), getAllBooks);

router.get("/:id", getBookById);

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createBookValidation),
  createBook,
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateBookValidation),
  updateBook,
);

router.delete("/:id", protect, authorize("admin"), deleteBook);

module.exports = router;
