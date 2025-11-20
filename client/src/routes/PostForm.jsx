import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { categories, fetchCategories } = useData();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    categories: [],
    featuredImageUrl: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchCategories();
    if (id) {
      api.getPost(id).then(p => setForm({
        title: p.title, slug: p.slug, content: p.content,
        categories: p.categories?.map(c => c._id) || [],
        featuredImageUrl: p.featuredImageUrl || ''
      }));
    }
  }, [id]);

  const uploadImage = async () => {
    if (!file) return;
    const url = await api.uploadImage(file, token);
    setForm({ ...form, featuredImageUrl: url });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Login required');
    if (id) {
      await api.updatePost(id, form, token);
    } else {
      await api.createPost(form, token);
    }
    navigate('/');
  };

  return (
    <form onSubmit={submit}>
      <h2>{id ? 'Edit Post' : 'New Post'}</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        placeholder="Slug"
        value={form.slug}
        onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
        required
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        rows={10}
        required
      />
      <input
        placeholder="Featured image URL"
        value={form.featuredImageUrl}
        onChange={e => setForm({ ...form, featuredImageUrl: e.target.value })}
      />

      <div>
        <p>Upload image:</p>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="button" onClick={uploadImage}>Upload Image</button>
      </div>

      <div>
        <p>Categories:</p>
        {categories.map(c => (
          <label key={c._id} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={form.categories.includes(c._id)}
              onChange={e => {
                const selected = new Set(form.categories);
                if (e.target.checked) selected.add(c._id);
                else selected.delete(c._id);
                setForm({ ...form, categories: Array.from(selected) });
              }}
            />
            {c.name}
          </label>
        ))}
      </div>

      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}