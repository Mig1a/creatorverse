import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCreators() {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('id', { ascending: true })

        if (error) throw error
        console.log('Supabase row keys:', data[0] ? Object.keys(data[0]) : 'no rows')
        console.log('First creator:', data[0])
        setCreators(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCreators()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <span className="spinner" />
          <p>Loading creators…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-box">
          <p>⚠️ {error}</p>
          <p>Check your Supabase credentials in <code>.env.local</code>.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="page-header">
        <div>
          <h1 className="page-title">✨ Creatorverse</h1>
          <p className="page-subtitle">
            Discover and follow your favourite content creators
          </p>
        </div>
        <Link to="/add" className="btn btn-primary btn-lg">
          + Add Creator
        </Link>
      </header>

      {creators.length === 0 ? (
        <div className="empty-state">
          <p>🌌 No creators yet — be the first to add one!</p>
          <Link to="/add" className="btn btn-primary">
            Add a Creator
          </Link>
        </div>
      ) : (
        <div className="grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowCreators
