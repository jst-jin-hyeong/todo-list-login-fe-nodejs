//모델을 만들기 위한 스크립트 파일이다.
//모델은 어떻게 만드는가? 스키마를 만들어서 붙여준다.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//taskSchema를 만든다. Schema()를 사용해서 Schema Type으로 만들어준다.
//스키마는 어떻게 만드는가? key이름: {속성종류1: 속성값1, 속성종류2: 속성값2 }
const taskSchema = Schema({
  task: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
});

//model을 만든다. 이 모델은 위의 taskSchema를 따른다. taskSchema의 Type은 taskSchema였다.
//  model은 그럼 mongoose.model("모델명", Schema타입을가진변수) 에 의해 생성되나보다. 인풋값이 "모델명", 스키마타입변수
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
