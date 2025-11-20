import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';

export default function PostList() {
  const { posts, meta, fetchPosts, categories } = useData();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  const search = () => fetchPosts({ q, category });

  return (
    <div>
      <h2>Posts</h2>
      <div style={{ marginBottom: '1rem', display: 'grid', gap: '0.5rem', gridTemplateColumns: '2fr 1fr auto' }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c._id} value={c.slug}>{c.name}</option>)}
        </select>
        <button onClick={search}>Search</button>
      </div>

      <ul>
        {posts.map(p => (
          <li key={p._id}>
            <Link to={`/posts/${p._id}`}>{p.title}</Link>
            {p.categories?.length ? ` — ${p.categories.map(c => c.name).join(', ')}` : ''}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button disabled={meta.page <= 1} onClick={() => fetchPosts({ page: meta.page - 1 })}>Prev</button>
        <span>Page {meta.page} of {Math.ceil(meta.total / meta.limit) || 1}</span>
        <button disabled={meta.page * meta.limit >= meta.total} onClick={() => fetchPosts({ page: meta.page + 1 })}>Next</button>
      </div>
    </div>
  );
}