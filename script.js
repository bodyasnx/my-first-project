// ===== Практична 14: базові скрипти та робота з DOM =====

// Крок 2: змінні з даними проєкту (const для незмінного, let для змінного)
const projectName = 'VXE R1 Pro Max';
const sectionNames = ['Головна', 'Переваги', 'Характеристики', 'Галерея', 'Контакти'];
let sectionsCount = sectionNames.length;

// Крок 3: перевіряємо значення у DevTools -> Console
console.log('Проєкт:', projectName);
console.log('Розділи сайту:', sectionNames);
console.log('Кількість розділів:', sectionsCount);


// Крок 4: вибираємо елементи DOM через querySelector
const mainTitle = document.querySelector('h1');
const pageFooter = document.querySelector('footer');
console.log('Заголовок h1:', mainTitle.textContent);
console.log('Футер знайдено:', pageFooter !== null);


// Крок 5: змінюємо текстовий вміст: поточний рік у футері
const yearElement = document.querySelector('#current-year');
yearElement.textContent = new Date().getFullYear();

// Крок 6: querySelectorAll повертає всі картки переваг
const cards = document.querySelectorAll('.card');
console.log('Кількість карток переваг:', cards.length);

// Крок 7: classList.add підсвічує активний пункт меню
const navLinks = document.querySelectorAll('.nav-list a');
navLinks[0].classList.add('active'); // на старті активна «Головна»

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

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

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // сторінка не перезавантажується

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();
  const consent = document.querySelector('#consent').checked;

  let error = '';
  if (name === '') {
    error = "Введіть ім'я.";
  } else if (email === '' || !email.includes('@')) {
    error = 'Введіть коректний email: він має містити «@».';
  } else if (message === '') {
    error = 'Напишіть повідомлення.';
  } else if (!consent) {
    error = 'Потрібна згода на обробку даних.';
  }

  if (error !== '') {
    showMessage(error, 'error');
    return;
  }

  // Крок 5: збираємо дані форми в об'єкт
  const data = { name, email, message };

  // Крок 8: стан завантаження — блокуємо кнопку на час запиту
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const buttonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Надсилання…';

  try {
    // Крок 6: надсилаємо POST-запит із JSON
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // Крок 7: перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error('Помилка сервера: ' + response.status);
    }
    const result = await response.json();
    console.log('Відповідь сервера:', result);

    showMessage('Дякуємо, ' + name + '! Повідомлення надіслано (id: ' + result.id + ').', 'success');
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
    message.className = 'text-muted';
    message.textContent = 'Не вдалося завантажити відгуки. Спробуйте пізніше.';
    reviewsList.append(message);
  }
}

loadReviews();