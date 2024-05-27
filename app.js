const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./src/routes/index");

const app = express();
app.use(bodyParser.json()); // 이게 있어야 req.body가 객체로 인식됨
app.use("/api", indexRouter);
//구조: /api/tasks/
//app.use("여기위치를뭐라고할지적는다", 그다음보낼곳을 적는다)
//api는 여기 api.js,   use('/api', )  require('./routes/index')
//tasks는 ./routes/index.js use('/task', )  require('./routes/task.api')
//methods는 ./routes/task.api.js

//require 순서는 큰거에서 작은걸 require해오네. 먼저 큰 거로 들어와서 그 다음거로 라우터되니까. use(시 또는 Bigger)    require(종 또는 Smaller)

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(3000, () => {
  console.log("Server is on 3000");
});
