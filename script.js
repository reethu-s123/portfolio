// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Glassomorphism Navigation Effect on Scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav")
  const scrolled = window.pageYOffset
  if (scrolled > 100) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

// Simple fade-in animation when scrolling
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".project-card, .skill-card, .achievement-card")
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
})

// Set initial styles for animation
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".project-card, .skill-card, .achievement-card")
  elements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      // Animate skill progress bars
      if (entry.target.classList.contains("skill-card")) {
        entry.target.classList.add("animate")
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".about-card, .skill-card, .project-card, .contact-card, .achievement-card")
  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Add smooth reveal animation to sections
const revealSections = document.querySelectorAll("section")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)
revealSections.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(50px)"
  section.style.transition = "all 0.8s ease"
  revealObserver.observe(section)
})

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing animation
document.addEventListener("DOMContentLoaded", () => {
  const titleName = document.querySelector(".title-name")
  if (titleName) {
    const originalText = titleName.textContent
    setTimeout(() => {
      typeWriter(titleName, originalText, 150)
    }, 1000)
  }
})

// Add smooth transitions to skill progress bars
window.addEventListener("scroll", () => {
  const skillCards = document.querySelectorAll(".skill-card.animate")
  skillCards.forEach((card) => {
    const progressBars = card.querySelectorAll(".progress-bar")
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      if (width && bar.style.width === "") {
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      }
    })
  })
})
