
window.addEventListener('scroll', function() {
  const progressBar = document.getElementById('bar').querySelector('.progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.height = scrollPercent + '%';
});



//Este archivo ha sido creado por: Francisco Tejero Angel