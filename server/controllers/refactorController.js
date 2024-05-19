const APIFeatures = require('../utils/apiFeatures');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const instances = await features.query;

        res.status(200).json({
            status: 'success',
            results: instances.length,
            data: {
                instances,
            },
        });
    });

exports.getOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const instance = await Model.findById(req.params.id);

        if (!instance) {
            // If no instance is found with the given ID, throw an error
            return next(
                new AppError(`No ${Model} found for this ID !`, 404)
            );
        }

        res.status(200).json({
            status: 'success',
            data: {
                instance,
            },
        });
    });

exports.createOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const newInstance = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                newInstance,
            },
        });
    });

exports.updateOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const instance = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!instance) {
            // If no instance is found with the given ID, throw an error
            throw new AppError(
                `No ${Model} found for this ID !`,
                404
            );
        }

        res.status(200).json({
            status: 'success',
            data: {
                instance,
            },
        });
    });

exports.deleteOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        await Model.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
