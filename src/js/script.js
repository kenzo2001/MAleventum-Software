particlesJS('particles-js', {
  particles: {
    number: { value: 100 },
    color: { value: "#00bfff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 180, color: "#00bfff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 3 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      repulse: { distance: 120 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
