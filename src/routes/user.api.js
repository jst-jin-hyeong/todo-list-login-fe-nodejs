const express = require("express");
// const taskController = require("../controller/task.controller");
const router = express.Router();
const userController = require("../../controller/user.controller");

//1. 회원가입 endpoint
router.post("/", userController.createUser);

//2. 로그인 endpoint
router.post("/login", userController.loginWithEmail);

// router.post("/", taskController.createTask);

// router.get("/", taskController.getTask);

// router.put("/:id", taskController.updateTask);

// router.delete("/:id", taskController.deleteTask);

module.exports = router;
