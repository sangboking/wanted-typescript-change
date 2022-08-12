import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTodoId } from '../api';

export default function Todo() {
  const [todoDetail, setTodoDetail] = useState<ITodo | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const loginToken : (string | null) = window.localStorage.getItem('loginToken')

  type ITodo = {
    content : string;
    createdAt : string;
    id : string;
    title : string;
    updatedAt : string
  }

  useEffect(() => {
    if(loginToken === null){
      alert('로그인이 필요합니다!');
      return navigate('/login');
    };

    getTodoId(location.pathname.slice(6), loginToken)
    .then((response) => {
      console.log(response.data.data)
      setTodoDetail(response.data.data)
    });
  },[]);

  const onClickHistoryBack = () => {
    navigate('/');
  };

  return (
    <DetailTodoWrapper>
      <TodoBox>
        <Header>
          원티드 투두리스트 상세조회
        </Header>

        <Content>
          <Title>{`Title : ${todoDetail?.title}`}</Title>
          <Title>{`Content : ${todoDetail?.content}`}</Title>
          <Title>{`만든시간 : ${todoDetail?.createdAt}`}</Title>
          <Title>{`수정시간 : ${todoDetail?.updatedAt}`}</Title>

          <BackButton
            onClick={onClickHistoryBack}
          >
            목록으로
          </BackButton>
        </Content>

      </TodoBox>
    </DetailTodoWrapper>
  )
};

const DetailTodoWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f6f8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoBox = styled.div`
  width: 60rem;
  height: 35rem;
  background-color: #fff;
  border-radius: 1rem;
  border:1px solid #eaeaea;
`;

const Header = styled.section`
  width: 100%;
  height: 5rem;
  background-color: skyblue;
  font-size: 1.5rem;
  font-weight: 500;
  color:#fff;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.section`
  width: 100%;
  height: 30rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: .5rem;
`;

const BackButton = styled.button`
  width: 6rem;
  height: 3rem;
  border-radius: 1rem;
  border:1px solid navy;
  background-color: navy;
  color:#fff;
  margin-top: 5rem;
  cursor: pointer;
`;