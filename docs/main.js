const themeButton = document.querySelector('#theme');
const clickButton = document.querySelector('#click');
const resetButton = document.querySelector('#reset');
const count = document.querySelector('#count');
const message = document.querySelector('#message');
let clicks = 0;
let savedTheme;
try {
  savedTheme = localStorage.getItem('playground-theme');
} catch {
  // Storage is optional; the controls still work without it.
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? 'Use light theme' : 'Use dark theme';
}
setTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try {
    localStorage.setItem('playground-theme', theme);
  } catch {
    // Keep the theme for this visit if storage is unavailable.
  }
});
clickButton.disabled = false;
resetButton.disabled = false;
message.textContent = 'Ready when you are. Try a click!';
clickButton.addEventListener('click', () => {
  clicks += 1;
  count.textContent = clicks;
  message.textContent = clicks === 1 ? 'It works! Your first click is in the books.' : `${clicks} clicks. JavaScript is doing its thing.`;
});
resetButton.addEventListener('click', () => {
  clicks = 0;
  count.textContent = clicks;
  message.textContent = 'Back to zero. Give it another go.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
