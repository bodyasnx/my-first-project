const express = require('express');

const app = express();
const PORT = 3000;

// Дозволяє читати JSON у тілі запиту (req.body)
app.use(express.json());

// Дані проєктів (мої роботи з курсу)
const projects = [
  {
    id: 1,
    title: 'Лендінг VXE R1 Pro Max',
    description: 'Адаптивний лендінг ігрової миші на HTML, CSS і JavaScript з темною та світлою темою.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'React-застосунок portfolio-react',
    description: 'Картки кольорових версій на React-компонентах із фільтром, лічильником і перемикачем теми.',
    tech: ['React', 'Vite', 'useState'],
  },
  {
    id: 3,
    title: "Форма зворотного зв'язку",
    description: 'Форма з валідацією (зокрема телефону) і відправкою даних через fetch.',
    tech: ['JavaScript', 'fetch', 'JSON'],
  },
  {
    id: 4,
    title: 'Node.js API',
    description: 'Сервер на Express, який віддає проєкти у форматі JSON і приймає повідомлення з форми.',
    tech: ['Node.js', 'Express', 'CORS'],
  },
];

// GET /api/projects — віддаємо список проєктів у форматі JSON
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// POST /api/contact — приймаємо повідомлення з форми
app.post('/api/contact', (req, res) => {
  console.log('Нове повідомлення з форми:', req.body);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});