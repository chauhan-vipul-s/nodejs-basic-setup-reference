const express = require("express");
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require("../controller/categoryController");


const router = express.Router();

router.post("/create",createCategory);

router.get("/all",getAllCategory);

router.get("/:id",getCategoryById);

router.put("/update/:id",updateCategory);

router.delete("/delete/:id",deleteCategory);

module.exports = router;
