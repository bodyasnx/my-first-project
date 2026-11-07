import { useState } from 'react'

function Greeting() {
  const [name, setName] = useState('')

  return (
    <div className="greeting">
      <label htmlFor="visitor-name">Ваше ім'я</label>
      <input
        id="visitor-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введіть ім'я"
      />
    </div>
  )
}

export default Greeting