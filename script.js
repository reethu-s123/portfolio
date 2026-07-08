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
    if (window.scrollY >= sectionTop - 200) {
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
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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
    const speed = (index + 1) * 10;
    bubble.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
  const shapes = document.querySelectorAll('.shape');
  const scrolled = window.pageYOffset;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ============ SKILL PROGRESS ANIMATION ============
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.skill-progress');

  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

// ============ TRIGGER ANIMATIONS ON SCROLL ============
window.addEventListener('scroll', () => {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      animateProgressBars();
    }
  });
}, { once: false });

// ============ DYNAMIC PARTICLE GENERATION ============
function createParticles() {
  const container = document.querySelector('.animated-bg');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    container.appendChild(particle);
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', createParticles);

// ============ RIPPLE EFFECT ON CLICK ============
document.querySelectorAll('.btn, .project-link, .contact-btn').forEach(element => {
  element.addEventListener('click', function(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const ripple = document.createElement('span');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
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
`;
document.head.appendChild(style);

// ============ SCROLL REVEAL ANIMATION ============
function revealOnScroll() {
  const reveals = document.querySelectorAll('.section-title, .category-title');
  
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
    animateProgressBars();
  }, 500);
});

// ============ PREVENT SCROLL ON MOBILE WHILE ANIMATING ============
let isAnimating = false;

document.addEventListener('scroll', () => {
  if (!isAnimating) {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  }
});

console.log('✨ Welcome to Reethu S Portfolio!');
