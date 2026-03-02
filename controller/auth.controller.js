const CustomErrorhandler = require('../error/custom-error.handler');
const AuthSchema = require('../schema/auth.schema');
const sendMessage = require('../utils/send-email');
const bcrypt = require('bcryptjs');
const { generateToken, sendTokenResponse } = require('../utils/jwt');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw CustomErrorhandler.BadRequest('Barcha maydonlar to\'ldirilishi shart');
    }

    const foundedUser = await AuthSchema.findOne({ email });
    if (foundedUser) {
      throw CustomErrorhandler.BadRequest('Bu email allaqachon royxatdan otgan');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const code = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');

    await sendMessage(name, code, email);

    await AuthSchema.create({
      name,
      email,
      password: hashedPassword,
      otp: code,
      otptime: new Date(Date.now() + 120000)
    });

    res.status(200).json({ message: "Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi. Iltimos, emailingizni tekshiring." });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });
    if (!foundedUser) {
      throw CustomErrorhandler.BadRequest('Bunday foydalanuvchi topilmadi');
    }

    if (!foundedUser.otptime || foundedUser.otptime < new Date()) {
      throw CustomErrorhandler.BadRequest('OTP muddati tugagan');
    }

    if (foundedUser.otp !== otp) {
      throw CustomErrorhandler.BadRequest('OTP kod noto\'g\'ri');
    }

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      verified: true,
      otp: null,
      otptime: null
    });

    sendTokenResponse(foundedUser, 200, res);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw CustomErrorhandler.BadRequest('Email va parol kiritilishi shart');
    }

    const foundedUser = await AuthSchema.findOne({ email });
    if (!foundedUser) {
      throw CustomErrorhandler.BadRequest('Email yoki parol noto\'g\'ri');
    }

    if (!foundedUser.verified) {
      throw CustomErrorhandler.BadRequest('Email tasdiqlanmagan');
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);
    if (!isMatch) {
      throw CustomErrorhandler.BadRequest('Email yoki parol noto\'g\'ri');
    }

    sendTokenResponse(foundedUser, 200, res);
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw CustomErrorhandler.Unauthorized('Token topilmadi');
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: "Muvaffaqiyatli chiqildi",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, verify ,login , logout};