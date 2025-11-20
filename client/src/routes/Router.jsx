import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './PostList.jsx';
import PostView from './PostView.jsx';
import PostForm from './PostForm.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostView />} />
      <Route path="/new" element={<PrivateRoute><PostForm /></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><PostForm /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}