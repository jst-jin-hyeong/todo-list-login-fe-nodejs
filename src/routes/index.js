const express = require("express");
const router = express.Router();
const taskAPI = require("./task.api");
const userApi = require("./user.api");

router.use("/tasks", taskAPI, () => {
  console.log("tasks 여기까진 와?");
});
router.use("/user", userApi);

module.exports = router;
