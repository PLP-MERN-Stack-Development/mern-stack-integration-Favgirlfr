import { useEffect, useState } from 'react'
import './App.css'
import { fetchPosts, API_ROOT } from './services/api'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchPosts()
        setPosts(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="app-root">
      <header>
        <h1>My Blog</h1>
  <small>API: {API_ROOT}</small>
      </header>

      {loading && <p>Loading posts…</p>}
      {error && (
        <div className="error">
          <p>Failed to load posts: {error}</p>
          <p>Make sure the backend server is running and reachable from this origin.</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p>No posts found. Create some posts via the API or run the seed script.</p>
      )}

      <main>
        {posts.map((p) => (
          <article key={p._id} className="post">
            <h2>{p.title}</h2>
            {p.excerpt && <p className="excerpt">{p.excerpt}</p>}
            <p className="meta">
              By {p.author?.name || 'Unknown'} in {p.category?.name || 'Uncategorized'} •{' '}
              {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''}
            </p>
          </article>
        ))}
      </main>

      <footer>
        <p>Development build — replace with a full blog UI.</p>
      </footer>
    </div>
  )
}

export default App
