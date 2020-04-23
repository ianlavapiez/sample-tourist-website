const express = require('express')

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController')
const {
  signup,
  login,
  protect,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.patch('/update-me', protect, updateMe)
router.delete('/delete-me', protect, deleteMe)
router.patch('/update-password', protect, updatePassword)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
