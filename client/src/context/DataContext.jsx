import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
  const [categories, setCategories] = useState([]);

  const fetchPosts = async (params = {}) => {
    const { items, page, limit, total } = await api.getPosts(params);
    setPosts(items);
    setMeta({ page, limit, total });
  };

  const fetchCategories = async () => {
    const data = await api.getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <DataContext.Provider value={{ posts, meta, categories, fetchPosts, fetchCategories }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);