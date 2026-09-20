
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