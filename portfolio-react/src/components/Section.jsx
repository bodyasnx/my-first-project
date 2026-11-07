function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="site-container">
        <div className="section-head">
          <h2 id={`${id}-title`}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export default Section