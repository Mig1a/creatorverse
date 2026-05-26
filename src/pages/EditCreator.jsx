import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCreator() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setForm({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? data.imageurl ?? '',
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCreator()
  }, [id])

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
      const { error } = await supabase
        .from('creators')
        .update(payload)
        .eq('id', id)
      if (error) throw error
      navigate(`/creator/${id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${form.name}"? This cannot be undone.`)) return
    setDeleting(true)
    setError(null)
    try {
      const { error } = await supabase.from('creators').delete().eq('id', id)
      if (error) throw error
      navigate('/')
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <span className="spinner" />
          <p>Loading creator…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container form-container">
      <Link to={`/creator/${id}`} className="back-link">
        ← Back to creator
      </Link>

      <h1 className="page-title">Edit Creator</h1>
      <p className="page-subtitle">Update the details for <strong>{form.name}</strong></p>

      {error && <div className="error-box">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="creator-form">
        <label>
          Name <span className="required">*</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
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
            {saving ? 'Saving…' : '💾 Save Changes'}
          </button>
          <Link to={`/creator/${id}`} className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>

      <div className="danger-zone">
        <h2>Danger Zone</h2>
        <p>Permanently delete this creator. This action cannot be undone.</p>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={deleting}
        >
          {deleting ? 'Deleting…' : '🗑️ Delete Creator'}
        </button>
      </div>
    </div>
  )
}

export default EditCreator
