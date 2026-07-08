// ============ MOBILE NAVIGATION ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============ ACTIVE NAVIGATION LINK ============
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 250) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============ OBSERVE ELEMENTS ============
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.skill-item, .project-card, .achievement-card, .about-card, .contact-card'
  );

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});

// ============ ANIMATE BUBBLES ON MOUSE MOVE ============
document.addEventListener('mousemove', (e) => {
  const bubbles = document.querySelectorAll('.bubble');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  bubbles.forEach((bubble, index) => {
    const speed = (index + 1) * 12;
    bubble.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
  const shapes = document.querySelectorAll('.shape');
  const scrolled = window.pageYOffset;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.6;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ============ DYNAMIC PARTICLE GENERATION ============
function createParticles() {
  const container = document.querySelector('.animated-bg');
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', createParticles);

// ============ RIPPLE EFFECT ON CLICK ============
document.querySelectorAll('.btn, .project-link, .contact-btn, .social-btn').forEach(element => {
  element.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.7)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-animation 0.7s ease-out';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 700);
  });
});

// ============ ADD RIPPLE ANIMATION ============
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes smooth-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// ============ REVEAL ON SCROLL ============
function revealOnScroll() {
  const reveals = document.querySelectorAll('.section-title, .category-title, .skill-category');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Trigger animations
  setTimeout(() => {
    console.log('✨ Portfolio loaded successfully!');
  }, 500);
});

// ============ ACCESSIBILITY: PREFERS REDUCED MOTION ============
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  const styles = document.createElement('style');
  styles.textContent = `
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(styles);
}

// ============ CONSOLE MESSAGE ============
console.log('%c🚀 Welcome to Reethu S Portfolio!', 'color: #2563eb; font-size: 18px; font-weight: bold;');
console.log('%cLet\'s build something amazing together!', 'color: #0ea5e9; font-size: 14px;');
