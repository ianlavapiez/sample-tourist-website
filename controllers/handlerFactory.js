const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })

exports.retrieveOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)

    if (populateOptions) query = query.populate(populateOptions)

    const doc = await query

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.retrieveAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {}

    if (req.params.tourId) filter = { tour: req.params.tourId }

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const docs = await features.query
    // this code shows the overview of queried docs
    // const docs = await features.query.explain()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    })
  })
