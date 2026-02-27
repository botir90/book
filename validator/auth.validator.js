const Joi = require('joi');


const registerValidation = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Ism kamida 2 ta belgi bo\'lishi kerak',
      'string.max': 'Ism 50 ta belgidan oshmasligi kerak',
      'any.required': 'Ism majburiy',
      'string.empty': 'Ism bo\'sh bo\'lishi mumkin emas',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.email': 'Email noto\'g\'ri formatda',
      'any.required': 'Email majburiy',
      'string.empty': 'Email bo\'sh bo\'lishi mumkin emas',
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'Parol kamida 6 ta belgi bo\'lishi kerak',
      'string.max': 'Parol 30 ta belgidan oshmasligi kerak',
      'string.pattern.base': 'Parol katta harf, kichik harf va raqam o\'z ichiga olishi kerak',
      'any.required': 'Parol majburiy',
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Parollar mos kelmaydi',
      'any.required': 'Parolni tasdiqlash majburiy',
    }),
});


const loginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.email': 'Email noto\'g\'ri formatda',
      'any.required': 'Email majburiy',
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Parol majburiy',
      'string.empty': 'Parol bo\'sh bo\'lishi mumkin emas',
    }),
});


const forgotPasswordValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.email': 'Email noto\'g\'ri formatda',
      'any.required': 'Email majburiy',
    }),
});


const resetPasswordValidation = Joi.object({
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.min': 'Yangi parol kamida 6 ta belgi bo\'lishi kerak',
      'any.required': 'Yangi parol majburiy',
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Parollar mos kelmaydi',
      'any.required': 'Parolni tasdiqlash majburiy',
    }),
});

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
