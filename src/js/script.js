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
  // Animazione Colonne "Adozione" (corretto)
  // ==========================
  // - osserviamo .colonna (elemento con dimensione), non .colonna-fill che parte da 0
  // - usiamo data-height sul .colonna-fill per valore finale (es: data-height="73")
  // - animiamo altezza CSS + contatore interno
  const colonneContainer = document.querySelectorAll(".colonna");

  if (colonneContainer.length) {
    const colObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const col = entry.target; // .colonna
          const fill = col.querySelector(".colonna-fill");
          if (!fill || fill.classList.contains("animated")) return;

          // prendi il valore finale
          const finalStr = fill.dataset.height || fill.getAttribute("data-height") || "0";
          const finalHeight = Math.max(0, Math.min(100, parseFloat(finalStr))) || 0;

          // assicurati che il CSS parta da 0
          fill.style.height = "0%";
          fill.textContent = "0%";

          // ritardo microscopico per far partire la transizione CSS
          setTimeout(() => {
            fill.style.height = finalHeight + "%"; // qui interviene la transition CSS (height)
          }, 50);

          // animazione numerica (count-up)
          const duration = 1000; // ms
          const start = performance.now();
          function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(finalHeight * progress);
            fill.textContent = current + "%";
            if (progress < 1) requestAnimationFrame(step);
            else {
              fill.textContent = finalHeight + "%";
              fill.classList.add("animated"); // flag per non ri-animare
            }
          }
          requestAnimationFrame(step);

          // una volta animata una colonna, non osservare più (opzionale)
          colObserver.unobserve(col);
        }
      });
    }, { threshold: 0.35 });

    colonneContainer.forEach(col => colObserver.observe(col));
  }
// === Animazione cerchi progressivi ===
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

      // Cambio colore dinamico
      if (progress < 30) circle.style.stroke = "#ff9800";
      else if (progress < 60) circle.style.stroke = "#2196f3";
      else circle.style.stroke = "#4caf50";
    }
  }, 20);
});

});
