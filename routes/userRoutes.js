const express = require('express')

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController')
const {
  signup,
  login,
  protect,
  restrictTo,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)

// Protect all routes after this middleware
router.use(protect)

router.get('/me', getMe, getUser)
router.patch('/update-me', updateMe)
router.delete('/delete-me', deleteMe)
router.patch('/update-password', updatePassword)

// Protect all routes to use only for login
router.use(restrictTo('admin'))

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
