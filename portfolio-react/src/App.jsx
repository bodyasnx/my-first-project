import Card from './components/Card.jsx'

function App() {
  return (
    <main>
      <h1>VXE R1 Pro Max</h1>
      <Card
        title="Біла версія"
        text="Класичний білий колір, вигляд зверху."
        image="/images/gallery-white-top.webp"
      />
      <Card
        title="Бузкова версія"
        text="М'який бузковий відтінок."
        image="/images/gallery-lilac-top.webp"
      />
    </main>
  )
}

export default App