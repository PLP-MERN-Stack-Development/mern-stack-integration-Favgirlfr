// src/services/api.js
// Small API helper that respects Vite env var VITE_API_URL

// Raw value from Vite env (may include trailing slashes or '/api')
const RAW_API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function normalizeBase(raw) {
  if (!raw) return ''
  // remove trailing slashes
  let s = raw.replace(/\/+$|\\/g, '')
  // if user included '/api' at the end, strip it so we can append a single '/api' reliably
  s = s.replace(/\/api$/i, '')
  return s
}

const BASE = normalizeBase(RAW_API)
export const API_ROOT = BASE + '/api'

export async function fetchPosts() {
  const res = await fetch(`${API_ROOT}/posts`)
  if (!res.ok) {
    const text = await res.text().catch(() => null)
    throw new Error(text || `Request failed with status ${res.status}`)
  }
  return res.json()
}
