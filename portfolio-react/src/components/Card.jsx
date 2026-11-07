import { useState } from 'react'

function Card({ title, text, image }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="variant-card">
      <div className="variant-card-image">
        <img
          src={image}
          alt={`${title}: фото миші VXE R1 Pro Max`}
          loading="lazy"
        />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <button
        type="button"
        className="like-button"
        onClick={() => setLikes(likes + 1)}
      >
        ♥ Подобається: {likes}
      </button>
    </article>
  )
}

export default Card