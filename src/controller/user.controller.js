const User = require("../src/model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    console.log("post 여기까지 타고는 들어오나");

    // res.send("jh@ Create user controller will be here"); //////////////////////////////
    const { name, email, password } = req.body; //////////////////////////////////////
    console.log("req.body는 뭐가 찍히나: ", req.body);

    const user = await User.findOne({ email });
    console.log(user);
    // console.log("user가 도대체 뭔데: ", user.email);
    if (user) {
      throw new Error("이미 가입이 된 유저 입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log("hash: ", hash); ///////////////////////////////////////////////////////
    const newUser = new User({ name: name, email: email, password: hash });
    console.log(newUser.name, newUser.email, newUser.password); //여기까지만 하면 User 모델을 통해 User 객체만 생성이 된 것이고, DB에 저장이 된 것은 아니다.
    await newUser.save(); //모델로 생성한 "객체명.save()"를 해줘야 DB에 저장된다. 이 순간이 DB에 저장되는 순간이다.
    res.status(200).json({ status: "ok", data: newUser.email });
    // res.send("저장까지 완료되었습니다.");  res.send가 두 개 있으면 에러 터진다.
    //res.status(200).json({ status: "ok", data: newTask });
  } catch (error) {
    console.log("이게 에러: ", error);
    res.status(400).json({ status: "fail", error });
  }
};

// 1. 라우터 설정
userController.loginWithEmail = async (req, res) => {
  try {
    console.log("loginWithEmail 라우팅 확인: ");

    // 2. (프론트엔드가 보낸 req.body의 email과 password 읽어오기)
    const { name, email, password } = req.body;

    // 3. 이메일을 가지고 유저 정보 가져오기
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");

    // 4. 유저 있는지 없는지 확인. 만약 있다면, 이 유저의 DB에 있는 Password와 프론트엔드가 보낸 패스워드가 같은지 비교
    if (user) {
      // Load hash from your password DB.
      const isMatch = bcrypt.compareSync(password, user.password); // true
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");

    // if (hash = user.password)

    // 5. 맞다! 그러면 토큰 발행 { 로그인 성공 및 토큰 주기 }

    // 6. 틀리면 에러메시지 보냄
  } catch (error) {
    res.status(400).json({
      status: "fail. 아이디 혹은 비밀번호가 일치하지 않습니다.",
      error,
    });
  }
};

module.exports = userController;
