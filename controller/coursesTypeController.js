const CoursesType = require("../models/CoursesTypeSchema");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//@desc create courses type API
//@route POST  /api/v1/coursesType/create
//@access Public

const createCoursesType = asyncHandler(async (req, res) => {
  const { typeName } = req.body;
  const requiredFields = ["typeName"];
  const missingFields = requiredFields.filter((fields) => !req.body[fields]);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const existingType = await CoursesType.findOne({ typeName });
  if (existingType) {
    res.status(400);
    throw new Error("Courses Type already exists");
  }

  const courseType = new CoursesType({ typeName });

  const savedType = await courseType.save();
  if (!savedType) {
    res.status(400);
    throw new Error("Something went wrong");
  }
  res.status(201).json({
    statusCode: res.statusCode,
    status: true,
    message: "Course Type created successfuly",
    data: savedType,
  });
});

//@desc get all courses type API
//@route GET  /api/v1/coursesType/all
//@access Public

const getAllCoursesType = asyncHandler(async (req, res) => {
  const coursesType = await CoursesType.find();

  if (!coursesType.length) {
    res.status(404);
    throw new Error("No coursesType type Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get All courses successfully",
    data: coursesType,
  });
});

//@desc get by coursesType id API
//@route GET  /api/v1/coursesType/:id
//@access Public

const getCoursesTypeId = asyncHandler(async (req, res) => {
  const coursesTypeId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(coursesTypeId)) {
    res.status(400);
    throw new Error("Invalid coursesTypeId or coursesTypeId is missing");
  }

  const coursesType = await CoursesType.findById(coursesTypeId);

  if (!coursesType) {
    res.status(404);
    throw new Error("No coursesType Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get coursesType successfully",
    data: coursesType,
  });
});

//@desc coursesType update API
//@route PUT  /api/v1/coursesType/update/:id
//@access Public

const updateCoursesType = asyncHandler(async (req, res) => {
  const coursesTypeId = req.params.id;
  const requiredFields = ["typeName"];
  const missingFields = requiredFields.filter((fields) => !req.body[fields]);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (!mongoose.Types.ObjectId.isValid(coursesTypeId)) {
    res.status(400);
    throw new Error("Invalid coursesTypeId or coursesTypeId is missing");
  }

  const coursesType = await CoursesType.findById(coursesTypeId);

  if (!coursesType) {
    res.status(404);
    throw new Error("No coursesType Found");
  }

  const inputs = {
    typeName: req.body.typeName,
  };

  const updatedcoursesType = await CoursesType.findByIdAndUpdate(
    coursesTypeId,
    inputs,
    {
      new: true,
    }
  );
  if (!updatedcoursesType) {
    res.status(404);
    throw new Error("coursesType Not Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "coursesType get updated successfully",
    data: updatedcoursesType,
  });
});

//@desc CoursesType delete API
//@route DELETE  /api/v1/coursesType/delete/:id
//@access Public

const deleteCoursesType = asyncHandler(async (req, res) => {
  const coursesTypeId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(coursesTypeId)) {
    res.status(400);
    throw new Error("Invalid coursesTypeId or coursesTypeId is missing");
  }

  const coursesType = await CoursesType.findById(coursesTypeId);

  if (!coursesType) {
    res.status(404);
    throw new Error("No CoursesType Found");
  }

  const deletedCoursesType = await CoursesType.findByIdAndDelete(coursesTypeId);
  if (!deletedCoursesType) {
    res.status(404);
    throw new Error("CoursesType Not Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "CoursesType get deleted successfully",
    data: deletedCoursesType,
  });
});

module.exports = {
  createCoursesType,
  getAllCoursesType,
  getCoursesTypeId,
  updateCoursesType,
  deleteCoursesType,
};
