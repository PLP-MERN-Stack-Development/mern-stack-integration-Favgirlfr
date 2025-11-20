const BASE_URL = import.meta.env.VITE_API_URL || '';

const jsonHeaders = {
  'Content-Type': 'application/json'
};

export const api = {
  // Posts
  getPosts: async (params = {}) => {
    const q = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/api/posts?${q}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  },
  getPost: async (id) => {
    const res = await fetch(`${BASE_URL}/api/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
  },
  createPost: async (payload, token) => {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create post');
    return res.json();
  },
  updatePost: async (id, payload, token) => {
    const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
      method: 'PUT',
      headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update post');
    return res.json();
  },
  deletePost: async (id, token) => {
    const res = await fetch(`${BASE_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return res.json();
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/api/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },
  createCategory: async (payload, token) => {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
  },

  // Comments
  getComments: async (postId) => {
    const res = await fetch(`${BASE_URL}/api/posts/${postId}/comments`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
  },
  addComment: async (postId, payload, token) => {
    const res = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return res.json();
  },

  // Upload
  uploadImage: async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    const data = await res.json();
    return data.url;
  },

  // Auth
  register: async (email, password, name) => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) throw new Error('Failed to register');
    return res.json();
  },
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Failed to login');
    return res.json();
  }
};