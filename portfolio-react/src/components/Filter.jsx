import { categories } from '../data.js'

function Filter({ active, onChange }) {
  return (
    <div className="filter" role="group" aria-label="Фільтр карток">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`filter-button${active === category.id ? ' is-active' : ''}`}
          aria-pressed={active === category.id}
          onClick={() => onChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default Filter