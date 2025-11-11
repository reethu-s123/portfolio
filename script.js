// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Navbar glass/scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 100) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

// IntersectionObserver animations for cards and skills
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skill-card")) entry.target.classList.add("animate");
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".about-card, .skill-card, .project-card, .contact-card");
  animateElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// Typing effect for the name
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
document.addEventListener("DOMContentLoaded", () => {
  const titleName = document.querySelector(".title-name");
  if (titleName) {
    const originalText = titleName.textContent;
    setTimeout(() => typeWriter(titleName, originalText, 150), 800);
  }
});