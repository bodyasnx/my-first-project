import Card from './components/Card.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const variants = [
  {
    id: 1,
    title: 'Біла версія',
    text: 'Класичний білий колір, вигляд зверху.',
    image: '/images/gallery-white-top.webp',
  },
  {
    id: 2,
    title: 'Бузкова версія',
    text: "М'який бузковий відтінок.",
    image: '/images/gallery-lilac-top.webp',
  },
  {
    id: 3,
    title: 'Жовта версія',
    text: 'Яскравий жовтий колір для тих, хто любить виділятися.',
    image: '/images/gallery-yellow-top.webp',
  },
  {
    id: 4,
    title: 'Вигляд знизу',
    text: 'Сенсор, тефлонові ніжки та перемикач режимів підключення.',
    image: '/images/gallery-underside.webp',
  },
]
function App() {
  return (
    <>
      <Header />
      <main>
        <section id="variants" className="section" aria-labelledby="variants-title">
          <div className="site-container">
            <div className="section-head">
              <h1 id="variants-title">VXE R1 Pro Max</h1>
              <p>Кольорові версії ультралегкої бездротової миші.</p>
            </div>
            <div className="variants-grid">
              {variants.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App