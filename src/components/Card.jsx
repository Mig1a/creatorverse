import { Link } from 'react-router-dom'

const DEFAULT_IMAGE =
  'https://placehold.co/400x220/1a1a2e/e0e0e0?text=No+Image'

function Card({ creator }) {
  const { id, name, url, description } = creator
  const imageURL = creator.imageURL || creator.imageurl

  return (
    <article className="card">
      <Link to={`/creator/${id}`} className="card-image-link">
        <img
          src={imageURL || DEFAULT_IMAGE}
          alt={`${name} thumbnail`}
          className="card-image"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE
          }}
        />
      </Link>
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/creator/${id}`}>{name}</Link>
        </h3>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Visit Channel
          </a>
          <Link to={`/edit/${id}`} className="btn btn-secondary">
            Edit
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Card
