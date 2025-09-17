document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("fade-in");
      }
    });
  }, { threshold: 0.2 }); // 20% visibile per attivare

  const elements = document.querySelectorAll(".fade-left, .fade-right");
  elements.forEach(el => observer.observe(el));
});
