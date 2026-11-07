import { useState } from 'react'
import Header from './components/Header.jsx'
import Card from './components/Card.jsx'
import Footer from './components/Footer.jsx'
import Section from './components/Section.jsx'
import { variants } from './data.js'
import Filter from './components/Filter.jsx'

function App() {
  const [theme, setTheme] = useState('dark')
    const [category, setCategory] = useState('all')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
    const visibleVariants =
    category === 'all'
      ? variants
      : variants.filter((item) => item.category === category)

  return (
    <div className="app" data-theme={theme}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <h1 className="visually-hidden">VXE R1 Pro Max</h1>
        <Section
          id="variants"
          title="Кольорові версії"
          subtitle="Ультралегка бездротова миша VXE R1 Pro Max."
        >
          <Filter active={category} onChange={setCategory} />
          <div className="variants-grid">
            {visibleVariants.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </Section>
        <Section id="about" title="Про проєкт">
          <p className="note">
            Картки виводяться з масиву через map, а шапка, підвал і секції це окремі
            React-компоненти.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

export default App