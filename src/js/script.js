document.addEventListener("DOMContentLoaded", function() {

  // ==========================
  // Animazione Fade-in
  // ==========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("fade-in");
      }
    });
  }, { threshold: 0.2 });

  const elements = document.querySelectorAll(".fade-left, .fade-right");
  elements.forEach(el => observer.observe(el));

  // ==========================
  // Animazione Colonne Istogramma
  // ==========================
  document.addEventListener("DOMContentLoaded", function() {
  // altre animazioni come fade-in, particles, matrix...

  // Animazione colonne Adozione (con dati reali)
  const colonne = document.querySelectorAll(".colonna-fill");
  const colObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        const finalHeight = entry.target.dataset.height;
        entry.target.classList.add("animated");
        entry.target.style.height = "0%";  // parte da zero
        setTimeout(() => {
          entry.target.style.height = finalHeight + "%";
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  colonne.forEach(col => {
    colObserver.observe(col);
  });

});

  colonne.forEach(col => {
    // salvo l'altezza finale in un dataset
    const match = col.style.height.match(/(\d+)%/);
    if(match){
      col.dataset.height = match[1];
    }
    colObserver.observe(col);
  });

  // ==========================
  // Particles.js
  // ==========================
  particlesJS('particles-js', {
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2 }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });

  // ==========================
  // Matrix Animation
  // ==========================
  const canvas = document.getElementById("matrix");
  if(canvas){
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const letters = "01";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(10, 25, 47, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 40);
  }
});
