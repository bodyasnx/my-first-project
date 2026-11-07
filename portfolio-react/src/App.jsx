import Card from './components/Card.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Section from './components/Section.jsx'

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
        <h1 className="visually-hidden">VXE R1 Pro Max</h1>
        <Section
          id="variants"
          title="Кольорові версії"
          subtitle="Ультралегка бездротова миша VXE R1 Pro Max."
        >
          <div className="variants-grid">
            {variants.map((item) => (
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
    </>
  )
}

export default App