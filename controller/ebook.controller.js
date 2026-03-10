const Ebook = require('../schema/ebook.schema');
const CustomErrorhandler = require('../error/custom-error.handler');

// Elektron kitob qo'shish
const addEbook = async (req, res, next) => {
  try {
    const { title, pdfUrl, book } = req.body;

    if (!title || !pdfUrl || !book) {
      throw CustomErrorhandler.BadRequest('Barcha maydonlar to\'ldirilishi shart');
    }

    const ebook = await Ebook.create({ title, pdfUrl, book });

    res.status(201).json({ success: true, data: ebook });
  } catch (error) {
    next(error);
  }
};

// Kitob bo'yicha elektron kitoblarni ko'rish
const getEbooksByBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const ebooks = await Ebook.find({ book: bookId });

    if (!ebooks.length) {
      throw CustomErrorhandler.NotFound('Bu kitob uchun elektron kitob topilmadi');
    }

    res.status(200).json({ success: true, count: ebooks.length, data: ebooks });
  } catch (error) {
    next(error);
  }
};

// PDF URL olish (ko'rish)
const getEbookUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ebook = await Ebook.findById(id);

    if (!ebook) {
      throw CustomErrorhandler.NotFound('Elektron kitob topilmadi');
    }

    res.status(200).json({ success: true, pdfUrl: ebook.pdfUrl });
  } catch (error) {
    next(error);
  }
};
const updateEbook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ebook = await Ebook.findByIdAndUpdate(id, req.body, { new: true });

    if (!ebook) {
      throw CustomErrorhandler.NotFound('Elektron kitob topilmadi');
    }

    res.status(200).json({ success: true, data: ebook });
  } catch (error) {
    next(error);
  }
};
module.exports = { addEbook, getEbooksByBook, getEbookUrl , updateEbook };