import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api';

export default function Join() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);

  const navigate = useNavigate();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const joinValidation = () => {
    const emailValidation = email.includes('@') && email.includes('.');
    const passwordValidation = password.length > 7;

    if(emailValidation && passwordValidation){
      setButtonActivate(true);
    };

    if(!emailValidation || !passwordValidation){
      setButtonActivate(false);
    };
  };

  useEffect(() => {
    joinValidation();
  },[email, password]);

  const onClickSingUp = () => {
    signUp(email, password)
    .then(() => {
      navigate('/login')
    })
  };

  return (
    <JoinWrapper>
      <Title>원티드 프리온보딩 회원가입</Title>

        <InputBox>
          <InputLabel>이메일</InputLabel>
          <EmailPwInput 
            onChange={onChangeEmail}
          />
        </InputBox>

        <InputBox>
          <InputLabel>비밀번호</InputLabel>
          <EmailPwInput 
            onChange={onChangePassword} 
            type='password'
          />
        </InputBox>

        {
          buttonActivate ?
          <JoinButton       
            onClick={onClickSingUp}
            buttonActivate={buttonActivate}
          >
            회원가입
          </JoinButton> 
        :
          <JoinButton       
            onClick={onClickSingUp}
            buttonActivate={buttonActivate}
            disabled
          >
            회원가입
          </JoinButton>
        }
  
    </JoinWrapper>
  )
};

const JoinWrapper = styled.div`
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

const JoinButton = styled.button<{buttonActivate : boolean}>`
  width: 7rem;
  height: 2rem;
  background-color:${props => props.buttonActivate ? 'navy' : 'gray'};
  color:#fff;
  border-radius: 15px;
  border:1px solid  #eaeaea;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
