import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

const INITIAL_FORM = { name: '', url: '', description: '', imageURL: '' }

function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.url || !form.description) {
      setError('Name, URL, and description are required.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const payload = {
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim(),
        imageURL: form.imageURL.trim() || null,
      }
      const { error } = await supabase.from('creators').insert([payload])
      if (error) throw error
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container form-container">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <h1 className="page-title">Add a Creator</h1>
      <p className="page-subtitle">Share a creator you think is worth following</p>

      {error && <div className="error-box">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="creator-form">
        <label>
          Name <span className="required">*</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Marques Brownlee"
            required
          />
        </label>

        <label>
          Channel / Page URL <span className="required">*</span>
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://youtube.com/@mkbhd"
            required
          />
        </label>

        <label>
          Description <span className="required">*</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="What kind of content do they make?"
            required
          />
        </label>

        <label>
          Image URL <span className="optional">(optional)</span>
          <input
            type="url"
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        {form.imageURL && (
          <div className="image-preview">
            <img
              src={form.imageURL}
              alt="preview"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            {saving ? 'Adding…' : '✨ Add Creator'}
          </button>
          <Link to="/" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddCreator
