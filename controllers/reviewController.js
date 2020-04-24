const Review = require('../models/reviewModel')

const { createOne, retrieveAll, retrieveOne, updateOne, deleteOne } = require('./handlerFactory')

exports.getAllReviews = retrieveAll(Review)
exports.getReview = retrieveOne(Review)
exports.createReview = createOne(Review)
exports.updateReview = updateOne(Review)
exports.deleteReview = deleteOne(Review)

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id

  next()
}
