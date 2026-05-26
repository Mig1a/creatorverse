import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const DEFAULT_IMAGE =
  'https://placehold.co/600x340/1a1a2e/e0e0e0?text=No+Image'

function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
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
        setCreator(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCreator()
  }, [id])

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

  if (error || !creator) {
    return (
      <div className="container">
        <div className="error-box">
          <p>⚠️ Creator not found.</p>
          <Link to="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Back to all creators
      </Link>

      <div className="view-card">
        <img
          src={creator.imageURL || creator.imageurl || DEFAULT_IMAGE}
          alt={`${creator.name} thumbnail`}
          className="view-image"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE
          }}
        />
        <div className="view-body">
          <h1 className="view-title">{creator.name}</h1>
          <p className="view-description">{creator.description}</p>
          <a
            href={creator.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-lg"
          >
            Visit Channel ↗
          </a>

          <div className="view-actions">
            <Link to={`/edit/${creator.id}`} className="btn btn-secondary">
              ✏️ Edit Creator
            </Link>
            <Link to="/" className="btn btn-ghost">
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCreator
