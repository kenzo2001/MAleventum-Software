document.addEventListener("DOMContentLoaded", function() {

  // ==========================
  // Fade-in (come prima)
  // ==========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("fade-in");
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-left, .fade-right").forEach(el => observer.observe(el));

  // ==========================
  // Particles.js (se caricato)
  // ==========================
  if (typeof particlesJS !== 'undefined') {
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
  }

  // ==========================
  // Matrix Animation (se esiste canvas #matrix)
  // ==========================
  const canvas = document.getElementById("matrix");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let fontSize = 16;
    let drops = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const letters = "01";
    function drawMatrix() {
      ctx.fillStyle = "rgba(10, 25, 47, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 40);
  }

  // ==========================
  // Animazione Colonne "Adozione"
  // ==========================
  const colonneContainer = document.querySelectorAll(".colonna");
  if (colonneContainer.length) {
    const colObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const col = entry.target;
          const fill = col.querySelector(".colonna-fill");
          if (!fill || fill.classList.contains("animated")) return;

          const finalStr = fill.dataset.height || fill.getAttribute("data-height") || "0";
          const finalHeight = Math.max(0, Math.min(100, parseFloat(finalStr))) || 0;

          fill.style.height = "0%";
          fill.textContent = "0%";

          setTimeout(() => {
            fill.style.height = finalHeight + "%";
          }, 50);

          const duration = 1000;
          const start = performance.now();
          function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(finalHeight * progress);
            fill.textContent = current + "%";
            if (progress < 1) requestAnimationFrame(step);
            else {
              fill.textContent = finalHeight + "%";
              fill.classList.add("animated");
            }
          }
          requestAnimationFrame(step);
          colObserver.unobserve(col);
        }
      });
    }, { threshold: 0.35 });

    colonneContainer.forEach(col => colObserver.observe(col));
  }

  // ==========================
  // Animazione cerchi progressivi
  // ==========================
  document.querySelectorAll(".circle-container").forEach(container => {
    const circle = container.querySelector(".progress");
    const percentText = container.querySelector(".percentage");
    const percent = parseInt(container.getAttribute("data-percent"), 10);

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= percent) {
        clearInterval(interval);
      } else {
        progress++;
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        percentText.textContent = progress + "%";

        if (progress < 30) circle.style.stroke = "#ff9800";
        else if (progress < 60) circle.style.stroke = "#2196f3";
        else circle.style.stroke = "#4caf50";
      }
    }, 20);
  });

  // ==========================
  // Sincronizza altezza Perché Noi & Adozione
  // ==========================
  function syncHeights() {
    const percheNoi = document.querySelector('.perche-noi');
    const adozione = document.querySelector('.adozione');

    if (!percheNoi || !adozione) return;

    // reset per ricalcolare dinamicamente
    percheNoi.style.height = 'auto';
    adozione.style.height = 'auto';

    const maxHeight = Math.max(percheNoi.offsetHeight, adozione.offsetHeight);

    percheNoi.style.height = `${maxHeight}px`;
    adozione.style.height = `${maxHeight}px`;
  }

  // sincronizza subito e al resize
  syncHeights();
  window.addEventListener('resize', syncHeights);

  // sincronizza anche dopo le animazioni (colonne e cerchi) con piccolo delay
  setTimeout(syncHeights, 1000);
  setTimeout(syncHeights, 2000);

});
