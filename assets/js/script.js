// =============================================
// DOM Elements
// =============================================
const navbar = document.querySelector(".navbar")
const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
const statNumbers = document.querySelectorAll(".stat-number")
const filterBtns = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item")
const galleryZoomBtns = document.querySelectorAll(".gallery-zoom")
const modalImage = document.getElementById("modalImage")
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")

// =============================================
// =============================================
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)

  // Add transition effect
  document.body.style.transition = "background-color 0.5s ease, color 0.5s ease"
}

function updateThemeIcon(theme) {
  const themeToggleBtns = document.querySelectorAll(".theme-toggle i")
  themeToggleBtns.forEach((icon) => {
    icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill"
  })
}

// Initialize theme on load
initTheme()

// Add event listeners for theme toggle buttons
document.addEventListener("click", (e) => {
  if (e.target.closest(".theme-toggle")) {
    toggleTheme()
  }
})

// =============================================
// Navbar Scroll Effect
// =============================================
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar?.classList.add("scrolled")
  } else {
    navbar?.classList.remove("scrolled")
  }
}

window.addEventListener("scroll", handleNavbarScroll)

// =============================================
// Active Navigation Link
// =============================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
}

setActiveNavLink()

// =============================================
// Counter Animation with Easing
// =============================================
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"))
  const duration = 2500
  const startTime = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutQuart(progress)
    const current = Math.floor(easedProgress * target)

    element.textContent = current.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  requestAnimationFrame(updateCounter)
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

statNumbers.forEach((counter) => counterObserver.observe(counter))

// =============================================
// =============================================
const fadeElements = document.querySelectorAll(
  ".feature-card, .program-card, .testimonial-card, .team-card, .service-card, .pricing-card, .value-item, .contact-item, .gallery-item, .section-header",
)

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || index * 100
        setTimeout(
          () => {
            entry.target.classList.add("visible")
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0) scale(1)"
          },
          Math.min(delay, 500),
        )
        fadeObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
)

fadeElements.forEach((el, index) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  el.dataset.delay = index * 80
  fadeObserver.observe(el)
})

// =============================================
// Gallery Filter with Animation
// =============================================
if (filterBtns.length > 0) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          setTimeout(() => {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 50)
          }, index * 50)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// =============================================
// Gallery Modal
// =============================================
if (galleryZoomBtns.length > 0) {
  galleryZoomBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const galleryItem = btn.closest(".gallery-item")
      const imgSrc = galleryItem.querySelector("img").src
      if (modalImage) {
        modalImage.src = imgSrc
      }
    })
  })
}

// =============================================
// Contact Form with Animation
// =============================================
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name")?.value
    const phone = document.getElementById("phone")?.value
    const email = document.getElementById("email")?.value
    const privacy = document.getElementById("privacy")?.checked

    if (name && phone && email && privacy) {
      // Add submit animation
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Gönderildi!'
      submitBtn.disabled = true

      setTimeout(() => {
        contactForm.style.opacity = "0"
        contactForm.style.transform = "scale(0.9)"

        setTimeout(() => {
          contactForm.style.display = "none"
          formSuccess.style.display = "block"
          formSuccess.style.opacity = "0"
          formSuccess.style.transform = "scale(0.9)"

          setTimeout(() => {
            formSuccess.style.opacity = "1"
            formSuccess.style.transform = "scale(1)"
          }, 50)
        }, 300)
      }, 500)

      contactForm.reset()
    }
  })
}

// =============================================
// =============================================
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

  const particleCount = 80

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    const size = Math.random() * 6 + 2
    const duration = Math.random() * 15 + 10
    const delay = Math.random() * 10
    const startX = Math.random() * 100
    const startY = Math.random() * 100

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 77, 77, ${Math.random() * 0.6 + 0.2}) 0%, transparent 70%);
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      pointer-events: none;
      animation: particleFloat${i % 4} ${duration}s ease-in-out infinite;
      animation-delay: -${delay}s;
    `
    particlesContainer.appendChild(particle)
  }
}

// Add particle animations
const particleStyles = document.createElement("style")
particleStyles.textContent = `
  @keyframes particleFloat0 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translate(50px, -100px) rotate(180deg); }
    90% { opacity: 1; }
    100% { transform: translate(100px, -200px) rotate(360deg); opacity: 0; }
  }
  @keyframes particleFloat1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translate(-80px, -80px) rotate(-180deg); }
    90% { opacity: 1; }
    100% { transform: translate(-160px, -160px) rotate(-360deg); opacity: 0; }
  }
  @keyframes particleFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translate(30px, -120px) scale(1.5); }
    90% { opacity: 1; }
    100% { transform: translate(60px, -240px) scale(0.5); opacity: 0; }
  }
  @keyframes particleFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translate(-50px, -60px) scale(0.8); }
    90% { opacity: 1; }
    100% { transform: translate(-100px, -120px) scale(1.2); opacity: 0; }
  }
`
document.head.appendChild(particleStyles)

createParticles()

// =============================================
// Smooth Scroll for Internal Links
// =============================================
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

// =============================================
// Mobile Menu Close on Link Click
// =============================================
const navbarCollapse = document.querySelector(".navbar-collapse")
const navbarToggler = document.querySelector(".navbar-toggler")

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse?.classList.contains("show")) {
      navbarToggler?.click()
    }
  })
})

// =============================================
// =============================================
function createBackToTopButton() {
  const btn = document.createElement("button")
  btn.className = "back-to-top"
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>'
  btn.setAttribute("aria-label", "Yukarı çık")
  document.body.appendChild(btn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible")
    } else {
      btn.classList.remove("visible")
    }
  })

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

createBackToTopButton()

// =============================================
// Video Play Button
// =============================================
const playVideoBtn = document.getElementById("playVideoBtn")
if (playVideoBtn) {
  playVideoBtn.addEventListener("click", () => {
    // Create video modal
    const videoModal = document.createElement("div")
    videoModal.className = "video-modal"
    videoModal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `
    videoModal.innerHTML = `
      <div style="max-width: 900px; width: 90%; position: relative;">
        <button style="position: absolute; top: -50px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">
          <i class="bi bi-x-lg"></i>
        </button>
        <div style="background: var(--bg-card); padding: 40px; border-radius: 12px; text-align: center;">
          <i class="bi bi-play-circle" style="font-size: 5rem; color: var(--primary-color); margin-bottom: 20px; display: block;"></i>
          <h3 style="color: var(--text-primary); margin-bottom: 10px;">Tur Videosu</h3>
          <p style="color: var(--text-secondary);">Video içeriği burada oynatılacak.</p>
        </div>
      </div>
    `

    document.body.appendChild(videoModal)
    document.body.style.overflow = "hidden"

    setTimeout(() => {
      videoModal.style.opacity = "1"
    }, 10)

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal || e.target.closest("button")) {
        videoModal.style.opacity = "0"
        setTimeout(() => {
          videoModal.remove()
          document.body.style.overflow = ""
        }, 300)
      }
    })
  })
}

// =============================================
// =============================================
let ticking = false

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.pageYOffset
      const heroContent = document.querySelector(".hero-content")
      const heroImage = document.querySelector(".hero-image-wrapper")

      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`
        heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8)
      }

      if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`
      }

      ticking = false
    })
    ticking = true
  }
})

// =============================================
// =============================================
document.querySelectorAll(".btn-primary, .btn-lg").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px)`
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = ""
  })
})

// =============================================
// =============================================
document.querySelectorAll(".feature-card, .program-card, .service-card, .pricing-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = ""
  })
})

// =============================================
// =============================================
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#_"
    this.update = this.update.bind(this)
  }

  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => (this.resolve = resolve))
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]

      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span style="color: var(--primary-color);">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output

    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// Apply scramble effect to hero title on load
const heroTitle = document.querySelector(".hero-title")
if (heroTitle) {
  const originalText = heroTitle.textContent
  const fx = new TextScramble(heroTitle)

  setTimeout(() => {
    fx.setText(originalText)
  }, 500)
}

// =============================================
// =============================================
function createLoadingScreen() {
  const loadingScreen = document.createElement("div")
  loadingScreen.className = "loading-screen"
  loadingScreen.innerHTML = `
    <div style="text-align: center;">
      <div class="loader"></div>
      <p style="margin-top: 20px; color: var(--primary-color); font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">PowerFit</p>
    </div>
  `
  document.body.appendChild(loadingScreen)

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("hidden")
      setTimeout(() => {
        loadingScreen.remove()
      }, 500)
    }, 800)
  })
}

// Only create loading screen if not already loaded
if (document.readyState !== "complete") {
  createLoadingScreen()
}

// =============================================
// =============================================
function createCursorFollower() {
  if (window.innerWidth < 992) return

  const cursor = document.createElement("div")
  cursor.className = "cursor-follower"
  document.body.appendChild(cursor)

  let mouseX = 0,
    mouseY = 0
  let cursorX = 0,
    cursorY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animate() {
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1

    cursor.style.left = cursorX + "px"
    cursor.style.top = cursorY + "px"

    requestAnimationFrame(animate)
  }

  animate()

  // Add hover effects
  document.querySelectorAll("a, button, .btn").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"))
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"))
  })
}

createCursorFollower()

// =============================================
// Initialize
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("PowerFit website loaded successfully!")

  // Add transition styles for form elements
  const formElements = document.querySelectorAll(".contact-form-wrapper, #formSuccess")
  formElements.forEach((el) => {
    el.style.transition = "opacity 0.3s ease, transform 0.3s ease"
  })
})
