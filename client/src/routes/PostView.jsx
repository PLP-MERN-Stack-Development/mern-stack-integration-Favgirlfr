import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    api.getPost(id).then(setPost).catch(() => setPost(null));
    api.getComments(id).then(setComments);
  }, [id]);

  const handleDelete = async () => {
    if (!token) return alert('Login required');
    await api.deletePost(id, token);
    navigate('/');
  };

  const submitComment = async () => {
    if (!token) return alert('Login required');
    if (!newComment.trim()) return;
    await api.addComment(id, { content: newComment }, token);
    setNewComment('');
    const updated = await api.getComments(id);
    setComments(updated);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.featuredImageUrl && <img src={post.featuredImageUrl} alt={post.title} width={600} />}
      <p>{post.content}</p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <p><Link to="/">Back</Link></p>

      <h3>Comments</h3>
      <ul>
        {comments.map(c => <li key={c._id}><strong>{c.author}:</strong> {c.content}</li>)}
      </ul>
      <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." />
      <button onClick={submitComment}>Add Comment</button>
    </div>
  );
}