const express = require("express");
const { registerUser, loginUser, getUserById, updateUser, deleteUser, getUsers, getCurrentUser } = require("../controller/userController");
const validateToken = require("../ValidateTokenHadler");

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current",validateToken,getCurrentUser);

router.get("/all",validateToken,getUsers);

router.get("/:id",validateToken,getUserById);

router.put("/:id",validateToken,updateUser);

router.delete("/:id",validateToken,deleteUser);

module.exports = router;
