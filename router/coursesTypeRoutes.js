const express = require("express");
const { createCoursesType, getAllCoursesType, getCoursesTypeId, updateCoursesType, deleteCoursesType } = require("../controller/coursesTypeController");


const router = express.Router();

router.post("/create",createCoursesType);

router.get("/all",getAllCoursesType);

router.get("/:id",getCoursesTypeId);

router.put("/update/:id",updateCoursesType);

router.delete("/delete/:id",deleteCoursesType);

module.exports = router;