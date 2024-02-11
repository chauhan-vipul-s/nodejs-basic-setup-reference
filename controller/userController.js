const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Register User API
//@route POST  /api/v1/user/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName, role } = req.body;
  const requiredFields = [
    "username",
    "email",
    "password",
    "firstName",
    "lastName",
    "role",
  ];
  // check if required fields are missing
  const missingFields = requiredFields.filter((fields) => !req.body[fields]);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // check if username or email already exist
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    res.status(400);
    throw new Error("Username or email already exists");
  }
  // hased the string password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create the user with hashed password
  const user = new User({
    username,
    email,
    password: hashedPassword,
    name: { firstName, lastName },
    role,
  });

  const savedUser = await user.save();
  if (!savedUser) {
    res.status(400);
    throw new Error("Something went wrong");
  }
  const data = {
    id: savedUser.id,
    username: savedUser.username,
    email: savedUser.email,
    name: {
      firstName: savedUser.name.firstName,
      laseName: savedUser.name.lastName,
    },
    createdAt: savedUser.createdAt,
  };
  res.status(201).json({
    statusCode: res.statusCode,
    status: true,
    message: "user registered success",
    data: data,
  });
});

//@desc Login User API
//@route POST  /api/v1/user/login
//@access Private

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const requiredFields = ["email", "password"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Required fields missing: ${missingFields.join(", ")}`);
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      name: { firstName: user.name.firstName, lastName: user.name.lastName },
      createdAt: user.createdAt,
    },
    process.env.ACCESS_TOKEN_SECERT,
    { expiresIn: process.env.TOKEN_EXPRATION_TIME }
  );

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "User Login in successfuly",
    data: { accessToken },
  });
});

//@desc Get current user
//@route GET  /api/v1/user/current
//@access Private

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get current user successfuly",
    data: req.user,
  });
});

//@desc Get All User API
//@route GET  /api/v1/user/all
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(
    { _id: { $nin: [req.user?.id] } },
    { password: 0 }
  );

  if (!users.length) {
    res.status(404);
    throw new Error("No Users Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get user successfully",
    data: users,
  });
});

//@desc Get User by Id
//@route GET /api/v1/user/:id
//@access Private
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    res.status(400);
    throw new Error("Invalid UserId or UserId is missing");
  }

  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    res.status(404);
    throw new Error("No Users Found");
  }

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "Get user successfully",
    data: user,
  });
});

//@desc  Update  User API
//@route Put  /api/v1/user/:id
//@access Private

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    res.status(404);
    throw new Error("Invalid UserId or UserId is missing");
  }

  const user = User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const inputs = {
    username: req.body.username,
    email: req.body.email,
    name: { firstName: req.body.firstName, lastName: req.body.lastName },
    role: req.body.role,
  };

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: 0 },
    inputs,
    { new: true }
  );

  if (!updatedUser) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const resUser = {
    username: updatedUser.username,
    email: updatedUser.email,
    name: {
      firstName: updatedUser.name.firstName,
      lastName: updatedUser.name.lastName,
    },
    role: updatedUser.role,
  };

  res.status(200).json({
    statusCode: res.statusCode,
    status: true,
    message: "user get updated successfully",
    data: resUser,
  });
});

//@desc  Delete  User API
//@route Delete  /api/v1/user/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete user by id" });
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
};
