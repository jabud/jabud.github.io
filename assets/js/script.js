document.addEventListener('DOMContentLoaded', () => {
  console.log('Sitio cargado correctamente');
});

// dark or light mode
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});