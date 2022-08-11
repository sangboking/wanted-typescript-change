import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './auth/Home';
import Join from './auth/Join';
import Login from './auth/Login';
import Todo from './todo/Todo';

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/todo/:id" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}
