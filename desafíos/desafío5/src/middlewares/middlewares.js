const joi = require('joi');

const dataVerification = joi.object ({
  title: joi.string().required(),
  price: joi.number().required(),
  thumbnail: joi.string().uri()
})

async function validateProduct(req,res,next) {
  const { body } = req
  try {
    await dataVerification.validateAsync(body)
  } catch (err) {
    next(err)
  }
  next()
}

module.exports = validateProduct