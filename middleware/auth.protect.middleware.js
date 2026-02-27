const { verifyToken } = require('../utils/jwt');
const User = require('../schema/auth.schema');
const CustomError = require('../error/custom-error.handler');


const protect = async (req, res, next) => {
  try {
    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new CustomError('Kirish uchun tizimga kiring', 401));
    }

 
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new CustomError('Bu token egasi topilmadi', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};


const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError(
          `'${req.user.role}' role bu amalni bajarish huquqiga ega emas`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
