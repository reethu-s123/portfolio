// ============ 3D CANVAS BACKGROUND ============
function initCanvas3D() {
  const canvas = document.getElementById('canvas3d');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particles = [];
  const particleCount = 50;
  
  class Particle3D {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.z = Math.random() * 100;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.vz = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 2 + 1;
      this.color = ['#00d9ff', '#ff006e', '#00ff41'][Math.floor(Math.random() * 3)];
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      if (this.z < 0 || this.z > 100) this.vz *= -1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.z / 100;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.globalAlpha = 1;
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle3D());
  }
  
  function animate() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

document.addEventListener('DOMContentLoaded', initCanvas3D);

// ============ FLOATING PARTICLES ============
function createFloatingParticles() {
  const container = document.querySelector('.particles-container');
  const colors = ['cyan', 'magenta', 'green'];
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = `particle ${colors[Math.floor(Math.random() * colors.length)]}`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    container.appendChild(particle);
  }
}

createFloatingParticles();

// ============ MOBILE NAVIGATION ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
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

// ============ ACTIVE NAV LINK ============
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 300) {
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
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    '.skill-node, .project-card, .achievement, .about-card, .contact-card'
  );
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ============ SKILL BARS ANIMATION ============
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          fill.style.animation = 'fill-bar 1.5s ease-out forwards';
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => barObserver.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateSkillBars);

// ============ GLITCH EFFECT ON HOVER ============
document.querySelectorAll('.project-card, .contact-card, .achievement').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch-pulse 0.3s ease';
  });
});

const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch-pulse {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }
`;
document.head.appendChild(glitchStyle);

// ============ CONSOLE WELCOME MESSAGE ============
console.log('%c⚡ REETHU.DEV - FUTURISTIC TECH PORTFOLIO ⚡', 'color: #00d9ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
console.log('%cBuilding the future, one line of code at a time.', 'color: #ff006e; font-size: 14px;');
console.log('%cVisit: reethushivkumarth@gmail.com', 'color: #00ff41; font-size: 12px;');
