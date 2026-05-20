const { Router } = require('express');
const { addAudio, getAudiosByBook, deleteAudio, getAudioUrl, updateAudio } = require('../controller/audio.controller');
const { protect, authorize } = require('../middleware/auth.protect.middleware');

const audioRouter = Router();

audioRouter.post('/audios', protect, authorize('admin'), addAudio);
audioRouter.get('/books/:bookId/audios', getAudiosByBook);
audioRouter.get('/audios/:id/url', getAudioUrl);
audioRouter.delete('/audios/:id', protect, authorize('admin'), deleteAudio);
audioRouter.put('/audios/:id', protect, authorize('admin'), updateAudio);
module.exports = audioRouter;