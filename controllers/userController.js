const User = require('../models/userModel')

const { retrieveOne, retrieveAll, updateOne, deleteOne } = require('./handlerFactory')

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const filterObject = (object, ...allowedFields) => {
  const newObject = {}

  Object.keys(object).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = object[el]
  })

  return newObject
}

exports.getAllUsers = retrieveAll(User)
exports.getUser = retrieveOne(User)
// Do NOT update passwords with this!
exports.updateUser = updateOne(User)
exports.deleteUser = deleteOne(User)

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password updates. Please use /update-password.', 400)
    )
  }

  // 2) Filtered out unwanted field names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email')

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead.',
  })
}
