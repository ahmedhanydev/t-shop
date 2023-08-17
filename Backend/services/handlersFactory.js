const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ status: 201, data: document });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    // build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)

      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    const documentsCounts = await Model.countDocuments(
      apiFeatures.mongooseQuery
    );
    apiFeatures.paginate(documentsCounts);
    // execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(201).json({
      results: documentsCounts,
      paginationResult,
      data: documents,
    });
  });
exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // build query
    let query = Model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    const document = await query;
    if (!document) {
      return next(new ApiError(`this document is not found`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      // res.status(404).json({ message: "this category is not found" });
      return next(new ApiError(`this document is not found`, 404));
    }
    document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      // res.status(404).json({ message: "this product is not found" });
      return next(new ApiError(`this document is not found`, 404));
    }

    res.status(200).json({ message: "deleted success " });
  });
