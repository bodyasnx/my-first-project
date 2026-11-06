
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