import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(window.localStorage.getItem('loginToken')){
      navigate('/');
    };
  },[]);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  interface ILogin {
    message : string,
    token : string
  }

  const onClickLogin = () => {
    login(email, password)
    .then((response) => {
      localStorage.setItem('loginToken',response.data.token);
      alert('로그인에 성공하였습니다!');
      navigate('/');
    });
  };

  const onClickGoJoin = () => {
    navigate('/join');
  };

  return (
    <LoginWrapper>
      <Title>원티드 프리온보딩 로그인</Title>
 
      <InputBox>
          <InputLabel>이메일</InputLabel>
          <EmailPwInput value={email} onChange={onChangeEmail}/>
        </InputBox>

        <InputBox>
          <InputLabel>비밀번호</InputLabel>
          <EmailPwInput type='password' value={password} onChange={onChangePassword}/>
        </InputBox>

        <ButtonBox>
          <JoinButton onClick={onClickLogin}>로그인</JoinButton>
          <JoinButton style={{backgroundColor:'green', fontSize:'.5rem'}} onClick={onClickGoJoin}>회원가입 하러가기</JoinButton>
        </ButtonBox>
    </LoginWrapper>
  )
};

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #f5f6f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.2rem;
`;

const InputBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const InputLabel = styled.label`
  font-size: .8rem;
  margin-right: 1rem;
`;

const EmailPwInput = styled.input`
  width: 10rem;
  height: 2rem;
  border-radius: 15px;
  border:1px solid  #eaeaea;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const JoinButton = styled.button`
  width: 7rem;
  height: 2rem;
  background-color: navy;
  color:#fff;
  border-radius: 15px;
  border:1px solid  #eaeaea;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
`;

