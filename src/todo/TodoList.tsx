import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createTodo, deleteTodo, getTodoId, getTodoList, login, updateTodo } from '../api';

export default function TodoList() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [fixTodoTitle, setFixTodoTItle] = useState('');
  const [fixTodoContent, setFixTodoContent] = useState('');
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [todoId, setTodoId] = useState('');
  const [requery, setRequery] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  interface ITodos {
    title : string,
    content : string,
    id : string,
    createdAt : string,
    updateAt : string
  }

  const navigate = useNavigate();

  const loginToken = window.localStorage.getItem('loginToken');

  const onChangeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const onChangeTodoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  const onChangeFixTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixTodoTItle(e.target.value);
  };

  const onChangeFixTodoContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixTodoContent(e.target.value);
  };

  const getTodoById = (id : string, loginToken : any) => {
    getTodoId(id, loginToken)
    .then((response) => {
      setTodoId(response.data.data.id);
    })
  };

  const onClickCreateTodo = (loginToken : any) => {
    createTodo(todoTitle, todoContent, loginToken)
    .then(() => {
      setRequery(!requery);
      setTodoTitle('');
      setTodoContent('');
    })
  };

  const onClickDeleteTodo = (id : string, loginToken : any) => {
    deleteTodo(id, loginToken)
    .then((response) => {
      setRequery(!requery);
    })
  };

  const onClickUpdateTodo = (id : string, loginToken : any) => {
    updateTodo(id, fixTodoTitle, fixTodoContent, loginToken)
    .then((response) => {
      setRequery(!requery);
      setUpdateState(false);
    })
  };

  const onClickDetailTodo = (id : string, loginToken : any) => {
    getTodoId(id, loginToken)
    .then(() => {
      navigate(`/todo/${id}`)
    })
  };

  const onClickUpdateButton = (id : string) => {
    setUpdateState(!updateState);
    getTodoById(id, loginToken)
  };

  const getTodo = (loginToken : any) => {
    getTodoList(loginToken)
    .then((response) => {
      setTodos(response.data.data);
    })
  };

  useEffect(() => {
    getTodo(loginToken);
  },[requery]);

  return (
    <TodoListBox>
      <Header>????????? ???????????????</Header>

      <AddTodoSection>
        <InputBox>
          <AddTodoInput 
            value={todoTitle} 
            placeholder='????????? ????????? ?????????!' 
            onChange={onChangeTodoTitle}
          />
          <AddTodoInput 
            value={todoContent} 
            placeholder='????????? ????????? ?????????!' 
            onChange={onChangeTodoContent}
          />
        </InputBox>

        <AddTodoButton
          onClick={onClickCreateTodo}
        >
          ??????
        </AddTodoButton>
      </AddTodoSection>

      <ListSection>
        {
          todos.map((todo, i) => {
            return(
              <ListBox key={i}>
                {
                  updateState && todo.id === todoId ?
                  <FixBox>
                    <FixTitle>title :</FixTitle>
                    <FixTitleInput 
                      onChange={onChangeFixTodoTitle}
                    />

                    <FixTitle>content :</FixTitle>
                    <FixTitleInput 
                      onChange={onChangeFixTodoContent}
                    />
                  </FixBox>
                   :
                  <ListTitle>
                    {`title : ${todo.title} content : ${todo.content}`}
                  </ListTitle>
                }

                <ButtonBox>
                  {
                    updateState && todo.id === todoId ?
                    <>
                      <Button
                        onClick={() => {onClickUpdateTodo(todo.id, loginToken)}}
                      >
                        ??????
                      </Button>
                      <Button
                        onClick={() => {onClickUpdateButton(todo.id)}}
                      >
                        ??????
                      </Button>
                    </>
                     :
                    <Button 
                      onClick={() => {onClickUpdateButton(todo.id)}}
                    >
                      ??????
                    </Button>
                  }

                  <Button
                    onClick={() => {onClickDetailTodo(todo.id, loginToken)}}
                  >
                    ??????
                  </Button>

                  <Button
                    onClick={() => {onClickDeleteTodo(todo.id, loginToken)}}
                  >
                    ??????
                  </Button>
                </ButtonBox>
              </ListBox>
            )
          })
        }
       
      </ListSection>
    </TodoListBox>
  )
};

const TodoListBox = styled.div`
  width: 60rem;
  height: 35rem;
  background-color: #fff;
  border-radius: 1rem;
  border:1px solid #eaeaea;
`;

const Header = styled.section`
  width:100%;
  height: 5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color:#fff;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddTodoSection = styled.section`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
`;

const InputBox = styled.div`
  width: 80%;
  height: 4rem;
  display: flex;
  flex-direction: column;
`;

const AddTodoInput = styled.input`
  width:99%;
  height: 2rem;
  background: #495057;
  font-size: 1.2rem;
  color:#fff;
  padding-left: .5rem;
  border:none;
  ::placeholder{
    font-size: 1.2rem;
    color:#fff;
  }
  :focus{
    outline: none;
  }
`;

const AddTodoButton = styled.button`
  width: 20%;
  height: 4rem;
  background-color: gray;
  color:#fff;
  border:none;
  cursor: pointer;
`;

const ListSection = styled.section`
  width: 100%;
  height:26rem;
  background-color: #fff;
  overflow-y: auto;
`;

const ListBox = styled.div`
  width:100%;
  height: 4rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListTitle = styled.h1`
  font-size: 1rem;
  margin-left: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 3rem;
  height: 2rem;
  margin-right: 1rem;
`;

const FixBox = styled.div`
  display: flex;
  align-items: center;
`;

const FixTitle = styled.h1`
  font-size: 1rem;
  margin-left: 1rem;
  margin-right: .5rem;
`;

const FixTitleInput = styled.input`
  width:6rem;
  height: 1.5rem;
  background: #fff;
  font-size: .8rem;
  color:black;
  padding-left: .5rem;
  border:1px solid #eaeaea;
  ::placeholder{
    font-size: .5rem;
    color:#fff;
  }
`;