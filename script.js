// ===== Практична 14: базові скрипти та робота з DOM =====

// Крок 5: змінюємо текстовий вміст: поточний рік у футері
const yearElement = document.querySelector('#current-year');
yearElement.textContent = new Date().getFullYear();

// Крок 7: classList.add підсвічує активний пункт меню
const navLinks = document.querySelectorAll('.nav-list a');
navLinks[0].classList.add('active'); // на старті активна «Головна»

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

   // Підсвічування пункту меню за секцією, яка зараз посередині екрана
   const sections = [...navLinks]
     .map((link) => document.querySelector(link.getAttribute('href')))
     .filter(Boolean);

   const sectionObserver = new IntersectionObserver((entries) => {
     entries.forEach((entry) => {
       if (!entry.isIntersecting) return;
       navLinks.forEach((item) => {
         item.classList.toggle('active', item.getAttribute('href') === '#' + entry.target.id);
       });
     });
   }, { rootMargin: '-45% 0px -50% 0px' });

   sections.forEach((section) => sectionObserver.observe(section));

const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
} catch (e) {}

toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
});

// Бургер-меню: показуємо і ховаємо навігацію на мобільних екранах.
const navToggle = document.getElementById('nav-toggle');
const navPanel = document.getElementById('primary-nav');

function closeMenu() {
  navPanel.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = navPanel.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Клік по пункту меню закриває список (зручно на телефоні).
navPanel.querySelectorAll('.nav-list a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Клавіша Esc теж закриває меню.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


// ===== Практична 15: обробка подій і валідація форми =====
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('#form-message');

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = 'form-message is-' + type;
}

function clearMessage() {
  formMessage.textContent = '';
  formMessage.className = 'form-message';
}
function validateForm({ name, email, phone, message, consent }) {
  if (name === '') {
    return "Введіть ім'я.";
  } else if (email === '' || !email.includes('@')) {
    return 'Введіть коректний email: він має містити «@».';
  } else if (phone !== '' && !/^\+380\d{9}$/.test(phone)) {
    return 'Введіть телефон у форматі +380XXXXXXXXX.';
  } else if (message === '') {
    return 'Напишіть повідомлення.';
  } else if (!consent) {
    return 'Потрібна згода на обробку даних.';
  }

  return '';
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // сторінка не перезавантажується

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const phone = document.querySelector('#phone').value.trim();
  const message = document.querySelector('#message').value.trim();
  const topic = document.querySelector('#topic').value;
  const consent = document.querySelector('#consent').checked;

  const error = validateForm({ name, email, phone, message, consent });

  if (error !== '') {
    showMessage(error, 'error');
    return;
  }

  // Крок 5: збираємо дані форми в об'єкт
const data = { name, email, phone, topic, message };

  // Крок 8: стан завантаження — блокуємо кнопку на час запиту
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const buttonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Надсилання…';

  try {
    // Крок 6: надсилаємо POST-запит із JSON
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // Крок 7: перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error('Помилка сервера: ' + response.status);
    }
    await response.json();

    showMessage('Дякуємо, ' + name + '! Повідомлення надіслано на сервер.', 'success');
    contactForm.reset();
  } catch (error) {
    console.error('Помилка відправки:', error);
    showMessage("Не вдалося надіслати повідомлення. Перевірте з'єднання й спробуйте ще раз.", 'error');
  } finally {
    // виконується завжди: і після успіху, і після помилки
    submitButton.disabled = false;
    submitButton.textContent = buttonText;
  }
});

const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', () => {
  const value = emailInput.value.trim();
  if (value !== '' && !value.includes('@')) {
    showMessage('Email має містити «@».', 'error');
  } else {
    clearMessage();
  }
});

// ===== Практична 18: Fetch / AJAX =====
const reviewsList = document.querySelector('#reviews-list');


async function loadReviews() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    if (!response.ok) {
      throw new Error('Помилка сервера: ' + response.status);
    }
    const posts = await response.json();

    reviewsList.innerHTML = '';
    posts.forEach((post) => {
      const card = document.createElement('article');
      card.className = 'rounded-xl border border-line bg-surface p-6 shadow-md';

      const title = document.createElement('h3');
      title.className = 'text-lg font-semibold leading-snug';
      title.textContent = post.title;

      card.append(title);
      reviewsList.append(card);
    });
  } catch (error) {
    console.error('Не вдалося завантажити відгуки:', error);
    reviewsList.innerHTML = '';
    const message = document.createElement('p');
    message.className = 'text-muted col-span-full text-center';
    message.textContent = 'Не вдалося завантажити відгуки. Спробуйте пізніше.';
    reviewsList.append(message);
  }
}

loadReviews();

// ===== Практична 22: дані з власного API (Node.js) =====
const API_URL = 'http://localhost:3000';
const projectsList = document.querySelector('#projects-list');

async function loadProjects() {
  try {
    const response = await fetch(`${API_URL}/api/projects`);
    if (!response.ok) {
      throw new Error('Помилка сервера: ' + response.status);
    }
    const projects = await response.json();

    projectsList.innerHTML = '';
    projects.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'rounded-xl border border-line bg-surface p-6 shadow-md';

      const title = document.createElement('h3');
      title.className = 'text-lg font-semibold leading-snug';
      title.textContent = project.title;

      const text = document.createElement('p');
      text.className = 'mt-2 text-[0.95rem] text-muted';
      text.textContent = project.description;

      const tech = document.createElement('p');
      tech.className = 'mt-3 text-sm font-semibold text-brand';
      tech.textContent = project.tech.join(' · ');

      card.append(title, text, tech);
      projectsList.append(card);
    });
  } catch (error) {
    console.error('Не вдалося завантажити проєкти:', error);
    projectsList.innerHTML = '';
    const message = document.createElement('p');
    message.className = 'text-muted col-span-full text-center';
    message.textContent = 'Не вдалося завантажити проєкти. Переконайтеся, що сервер запущено (node server.js).';
    projectsList.append(message);
  }
}

loadProjects();

// ===== Практична 26: реєстрація service worker (PWA) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch((error) => console.error('Не вдалося зареєструвати service worker:', error));
  });
}