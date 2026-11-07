function Card({ title, text, image }) {
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
    </article>
  )
}

export default Card