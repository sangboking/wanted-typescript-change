import axios from "axios";

//로그인
export const login = (email : string, password : string) => {
  return  axios.post(`http://localhost:8080/users/login`,{
    email : email,
    password : password
  })
};

//회원가입
export const signUp = (email : string, password : string) => {
  return axios.post('http://localhost:8080/users/create',{
    email : email,
    password : password
  })
}

// todo id로 단일조회
export const getTodoId = (id : string, loginToken : string) => {
  return axios.get(`http://localhost:8080/todos/${id}`,
  {
    headers : {
      Authorization : loginToken
    }
  })
};

// todo 생성하기
export const createTodo = (todoTitle : string, todoContent : string, loginToken : string) => {
  return axios.post('http://localhost:8080/todos',
  {
    title : todoTitle,
    content : todoContent
  },
  {
    headers : {
      Authorization : loginToken
    }
  })
};

// todo 삭제하기
export const deleteTodo = (id : string, loginToken : string) => {
  return axios.delete(`http://localhost:8080/todos/${id}`,
    {
      headers : {
        Authorization : loginToken
      }
    })
};

// todo 수정하기
export const updateTodo = (id : string, fixTodoTitle : string, fixTodoContent : string, loginToken : string) => {
  return axios.put(`http://localhost:8080/todos/${id}`,
  {
    title : fixTodoTitle,
    content : fixTodoContent
  },
  {
    headers : {
      Authorization : loginToken
    }
  })
};

// todoList 조회하기
export const getTodoList = (loginToken : string) => {
  return axios.get('http://localhost:8080/todos',
  {
    headers : {
      Authorization : loginToken
    }
  })
};