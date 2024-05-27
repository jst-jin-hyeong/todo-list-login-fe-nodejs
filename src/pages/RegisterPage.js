import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    console.log("여기 handleSubmit 안 까지는 오나?");
    event.preventDefault();
    try {
      console.log("여기 try 안 까지는 오나?");
      if (password !== secPassword) {
        console.log("여기 if 안 까지는 오나?");
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
      }
      console.log("위에 if는 통과 했나?");
      const response = await api.post("/user", { name, email, password });

      console.log("rrrrr", response);
    } catch (error) {
      setError(error.message);
    }
    //에러메시지: 패스워드가 일치하지 않습니다. 다시 입력해주세요.
    //근데 이정도만으로는 고객이 혼란을 느낄 수 있다.
  };
  return (
    <div className="display-center">
      {error && <div>{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-enter the password"
            onChange={(event) => setSecPassword(event.target.value)}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
