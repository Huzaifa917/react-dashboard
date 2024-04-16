import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #002641;
`;

const Background = styled.div`
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Shape = styled.div`
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
`;

const FirstShape = styled(Shape)`
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
`;

const LastShape = styled(Shape)`
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
`;

const Form = styled.form`
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
`;

const Input = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
`;

const Button = styled.button`
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SocialButton = styled.div`
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
  margin-left: 25px;
  cursor: pointer;
`;
const HomeLink = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
`;


const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container>
            <HomeLink to="/">Home</HomeLink>
      <Background>

        <FirstShape />
        <LastShape />
      </Background>
      <Form onSubmit={handleLogin}>
        <Title>Login Here</Title>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          placeholder="Admin Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <Button type="submit">Log In</Button>
    
      </Form>
    </Container>
  );
};

export default LoginScreen;
