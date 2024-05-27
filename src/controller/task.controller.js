//여기는 기능 구현이야
const taskController = {};
const Task = require("../src/model/Task");

taskController.createTask = async (req, res) => {
  try {
    console.log("여기까진 들어왔나?");
    const { task, isComplete } = req.body;
    console.log(
      "body는 받았나?: body 출력",
      req.body.task,
      req.body.isComplete
    );
    const newTask = new Task({ task, isComplete });
    console.log("newTask는: ", newTask);
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    console.log("getTask updateTask err까지는 들어왔나?");
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    console.log("여기까진 들어왔나?");
    const { task, isComplete } = req.body;
    console.log(
      "body는 받았나?: body 출력",
      req.body.task,
      req.body.isComplete
    );
    const taskList = await Task.find({});
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    console.log("getTask Catch err까지는 들어왔나?");
    res.status(403).json({ status: "fail", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const taskUpdate = await Task.findById(req.param.id);
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const taskDelte = await Task.find({ task: this.task });
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};
module.exports = taskController;
