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

contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // сторінка не перезавантажується

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();
  const consent = document.querySelector('#consent').checked;
  console.log("Ім'я:", name);
  console.log('Email:', email);
  console.log('Повідомлення:', message);
  console.log('Згода:', consent);
  
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
    console.log('Помилка:', error);
    return;
  }
  console.log('Форма заповнена коректно');
});