const Category = require("../models/CategorySchema");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//@desc create category API
//@route POST  /api/v1/category/create
//@access Public

const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, logo } = req.body;
  const requiredFields = ["categoryName"];
  const missingFields = requiredFields.filter((fields) => !req.body[fields]);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const existingCategory = await Category.findOne({ categoryName });
  if (existingCategory) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = new Category({
    categoryName,
    logo,
  });

  const savedCategory = await category.save();
  if (!savedCategory) {
    res.status(400);
    throw new Error("Something went wrong");
  }
  res.status(201).json({
    statusCode: res.statusCode,
    status: true,
    message: "category created successfuly",
    data: savedCategory,
  });
});

//@desc get all category API
//@route GET  /api/v1/category/all
//@access Public

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  if (!category.length) {
    res.status(404);
    throw new Error("No Category Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get All Category successfully",
    data: category,
  });
});

//@desc get by category id API
//@route GET  /api/v1/category/:id
//@access Public

const getCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400);
    throw new Error("Invalid categoryId or categoryId is missing");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("No Category Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get category successfully",
    data: category,
  });
});

//@desc category update API
//@route PUT  /api/v1/category/update/:id
//@access Public

const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const requiredFields = ["categoryName", "logo"];
  const missingFields = requiredFields.filter((fields) => !req.body[fields]);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400);
    throw new Error("Invalid categoryId or categoryId is missing");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("No Category Found");
  }

  const inputs = {
    categoryName: req.body.categoryName,
    logo: req.body.logo,
  };

  const updatedCategory = await Category.findByIdAndUpdate(categoryId, inputs, {
    new: true,
  });
  if (!updatedCategory) {
    res.status(404);
    throw new Error("Category Not Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Category get updated successfully",
    data: updatedCategory,
  });
});

//@desc category delete API
//@route DELETE  /api/v1/category/delete/:id
//@access Public

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400);
    throw new Error("Invalid categoryId or categoryId is missing");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("No Category Found");
  }

  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    res.status(404);
    throw new Error("Category Not Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Category get deleted successfully",
    data: deletedCategory,
  });
});

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
