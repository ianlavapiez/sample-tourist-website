const Review = require('../models/reviewModel')

const { createOne, updateOne, deleteOne } = require('./handlerFactory')

const catchAsync = require('../utils/catchAsync')

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {}

  if (req.params.tourId) filter = { tour: req.params.tourId }

  // EXECUTE QUERY
  const reviews = await Review.find(filter)

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  })
})

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id

  next()
}

exports.createReview = createOne(Review)
exports.updateReview = updateOne(Review)
exports.deleteReview = deleteOne(Review)
