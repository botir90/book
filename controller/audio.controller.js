const Audio = require('../schema/audio.schema');
const CustomErrorhandler = require('../error/custom-error.handler');

// Qo'shish
const addAudio = async (req, res, next) => {
  try {
    const { title, audioUrl, duration, book } = req.body;

    if (!title || !audioUrl || !book) {
      throw CustomErrorhandler.BadRequest('Barcha majburiy maydonlar to\'ldirilishi shart');
    }

    const audio = await Audio.create({ title, audioUrl, duration, book });

    res.status(201).json({
      success: true,
      data: audio
    });
  } catch (error) {
    next(error);
  }
};

// Kitob bo'yicha ko'rish
const getAudiosByBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const audios = await Audio.find({ book: bookId });

    if (!audios.length) {
      throw CustomErrorhandler.NotFound('Bu kitob uchun audio topilmadi');
    }

    res.status(200).json({
      success: true,
      count: audios.length,
      data: audios
    });
  } catch (error) {
    next(error);
  }
};

// O'chirish
const deleteAudio = async (req, res, next) => {
  try {
    const { id } = req.params;

    const audio = await Audio.findByIdAndDelete(id);

    if (!audio) {
      throw CustomErrorhandler.NotFound('Audio topilmadi');
    }

    res.status(200).json({
      success: true,
      message: 'Audio muvaffaqiyatli o\'chirildi'
    });
  } catch (error) {
    next(error);
  }
};

// URL olish (tinglash)
const getAudioUrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    const audio = await Audio.findById(id);

    if (!audio) {
      throw CustomErrorhandler.NotFound('Audio topilmadi');
    }

    res.status(200).json({
      success: true,
      audioUrl: audio.audioUrl
    });
  } catch (error) {
    next(error);
  }
};
const updateAudio = async (req, res, next) => {
  try {
    const { id } = req.params;

    const audio = await Audio.findByIdAndUpdate(id, req.body, { new: true });

    if (!audio) {
      throw CustomErrorhandler.NotFound('Audio topilmadi');
    }

    res.status(200).json({
      success: true,
      data: audio
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addAudio, getAudiosByBook, deleteAudio, getAudioUrl ,updateAudio};