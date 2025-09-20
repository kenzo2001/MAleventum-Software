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
  // Link al footer
const linkFooter = document.getElementById('link-footer');

if (linkFooter) {
  linkFooter.addEventListener('click', function(e) {
    e.preventDefault();

    // Recupera il footer dal Shadow DOM
    const footerComponent = document.querySelector('footer-component');
    if (!footerComponent) return;

    const footer = footerComponent.shadowRoot.querySelector('footer');
    if (!footer) return;

    // Calcola l’altezza dell’header (se è sticky/fisso)
    const header = document.querySelector('header-component');
    const headerHeight = header ? header.offsetHeight : 0;

    // Scroll fluido con offset per header
    const footerTop = footer.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: footerTop,
      behavior: 'smooth'
    });
  });
}


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

document.addEventListener("DOMContentLoaded", () => {
  // Controlla che il canvas esista
  const canvas = document.getElementById("ss-hero-canvas");
  if (!canvas) return;

  // Configurazione base di Particles.js
  particlesJS(canvas.id, {
    particles: {
      number: {
        value: 60,
        density: { enable: true, value_area: 800 }
      },
      color: { value: "#00bfff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" }
      },
      opacity: {
        value: 0.6,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#00bfff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        bubble: { distance: 200, size: 4, duration: 0.3, opacity: 1 },
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("ss-hero-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground();
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  let particles = [];
  const speed = 1.5;
  const pulsePeriod = 2000;
  const numParticles = 40;
  const colors = ["#0a192f", "#007bff", "#00bfff", "#ffffff", "#000000"]; 

  // Disegna gradiente identico al CSS hero
  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0a192f");
    gradient.addColorStop(1, "#007bff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Fade della scia: residuo dura ~1 secondo
  function fadeTrail() {
    ctx.fillStyle = "rgba(2, 70, 180, 0.0167)"; // alpha ~ 1/60 per 60fps = 1 secondo
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function Particle(x, y, speed, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;

    this.update = function() {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);

      this.x += this.speed.x;
      this.y += this.speed.y;

      ctx.lineTo(this.x, this.y);
      ctx.stroke();

      const angle = Math.atan2(this.speed.y, this.speed.x);
      const magnitude = Math.sqrt(this.speed.x**2 + this.speed.y**2);
      const options = [angle + Math.PI/4, angle - Math.PI/4];

      if (Math.random() < 0.03) {
        const choice = options[Math.floor(Math.random() * options.length)];
        this.speed.x = Math.cos(choice) * magnitude;
        this.speed.y = Math.sin(choice) * magnitude;
      }
    }
  }

  function pulse() {
    setTimeout(pulse, pulsePeriod);
    for (let i = 0; i < numParticles; i++) {
      const angle = (i / 8) * 2 * Math.PI;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(
        canvas.width / 2,
        canvas.height / 2,
        { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        color
      ));
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    // Se ci sono particelle: disegna scia
    if (particles.length > 0) {
      fadeTrail();
    } else {
      // Se non ci sono particelle, mantieni il residuo solo 1 secondo
      ctx.fillStyle = "rgba(2, 70, 180, 0.0167)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    particles = particles.filter(p => {
      p.update();
      return p.x >= 0 && p.x <= canvas.width && p.y >= 0 && p.y <= canvas.height;
    });
  }

  pulse();
  animate();
});
