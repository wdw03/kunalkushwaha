/* ============================================
   KUNAL KUSHWAHA - PORTFOLIO JAVASCRIPT
   GSAP Animations, Particles, Custom Cursor
   ============================================ */

// ==========================================
// 1. PRELOADER
// ==========================================
let preloaderDismissed = false;
function dismissPreloader() {
  if (preloaderDismissed) return;
  preloaderDismissed = true;

  const preloader = document.getElementById('preloader');
  if (!preloader) {
    initAnimations();
    return;
  }

  gsap.to(preloader, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      preloader.style.display = 'none';
      initAnimations();
    }
  });
}

window.addEventListener('load', () => {
  setTimeout(dismissPreloader, 400);
});

// Fallback: dismiss after 1.5s maximum so user never waits
setTimeout(dismissPreloader, 1500);

// ==========================================
// 2. PARTICLE SYSTEM
// ==========================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '0, 229, 255' : '41, 121, 255';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 3. CUSTOM CURSOR
// ==========================================
function initCursor() {
  if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.transform = 'translate(-50%, -50%)';
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-card, .service-card, .strength-card, .magnetic');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
  });
}

// ==========================================
// 4. GSAP SCROLL ANIMATIONS
// ==========================================
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero section entrance animation
  // NOTE: .hero-image-container is ALWAYS visible (opacity 1) - NEVER animated with opacity 0!
  const heroTl = gsap.timeline({ delay: 0.1 });
  
  heroTl
    .fromTo('.hero-image-container', 
      { scale: 0.94 }, 
      { scale: 1, duration: 0.7, ease: 'power2.out', clearProps: 'transform' }
    )
    .fromTo('.hero-badge', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, 
      0.1
    )
    .fromTo('.hero-greeting', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'all' }, 
      0.2
    )
    .fromTo('.hero-name', 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'all' }, 
      0.3
    )
    .fromTo('.hero-title', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, 
      0.4
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, 
      0.5
    )
    .fromTo('.hero-actions .btn-primary', 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', clearProps: 'all' }, 
      0.6
    )
    .fromTo('.hero-actions .btn-secondary', 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', clearProps: 'all' }, 
      0.7
    )
    .fromTo('.hero-stats .stat-item', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }, 
      0.8
    )
    .fromTo('.hero-float-card', 
      { opacity: 0, scale: 0.7 }, 
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)', clearProps: 'opacity' }, 
      0.5
    );

  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header.children, 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  });

  // About section - image is ALWAYS visible
  gsap.fromTo('.about-image', 
    { scale: 0.96 },
    {
      scrollTrigger: {
        trigger: '.about-image',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'transform'
    }
  );

  gsap.fromTo('.about-text', 
    { opacity: 0, x: 30 },
    {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'all'
    }
  );

  // Skill cards stagger
  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 35 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: (i % 3) * 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  });

  // Service cards - images inside are ALWAYS visible
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: (i % 2) * 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  });

  // Strength cards
  gsap.utils.toArray('.strength-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 25, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        delay: (i % 4) * 0.08,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  });

  // Timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const direction = i % 2 === 0 ? -40 : 40;
    const card = item.querySelector('.timeline-card');
    if (card) {
      gsap.fromTo(card,
        { opacity: 0, x: direction },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }
  });

  // Contact section
  gsap.fromTo('.contact-detail-item',
    { opacity: 0, x: -30 },
    {
      scrollTrigger: {
        trigger: '.contact-details',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    }
  );

  // Counter animation
  animateCounters();
}

// ==========================================
// 5. COUNTER ANIMATION
// ==========================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.textContent.includes('%') ? '%' : '+';
    
    gsap.fromTo(counter, 
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        snap: { innerText: 1 },
        onUpdate: function() {
          counter.textContent = Math.ceil(this.targets()[0].innerText) + suffix;
        }
      }
    );
  });
}

// ==========================================
// 6. NAVIGATION ACTIVE STATE
// ==========================================
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const sidebarLinks = document.querySelectorAll('.nav-sidebar a');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // Smooth scroll
  [...sidebarLinks, ...mobileLinks].forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 0;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================
// 7. MAGNETIC BUTTON EFFECT
// ==========================================
function initMagneticButtons() {
  if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;

  const magnetics = document.querySelectorAll('.magnetic');

  magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// ==========================================
// 8. TILT EFFECT ON CARDS
// ==========================================
function initTiltCards() {
  if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.skill-card, .service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ==========================================
// 9. CONTACT FORM
// ==========================================
function initContactForm() {
  const form = document.getElementById('contactFormElement');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:kk6892734@gmail.com?subject=${encodeURIComponent(subject || 'Job Opportunity')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;

    // Visual feedback
    const btn = form.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
    btn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ==========================================
// 10. PARALLAX EFFECT ON SCROLL
// ==========================================
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Hero background parallax
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// ==========================================
// 11. TYPING TEXT ANIMATION
// ==========================================
function initTypingEffect() {
  const titles = ['AC & HVAC Systems', 'Mechanical Maintenance', 'Appliance Servicing', 'Facility Operations'];
  const titleElement = document.querySelector('.hero-title .highlight');
  
  if (!titleElement) return;
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      titleElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      titleElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
  }

  setTimeout(typeText, 2000);
}

// ==========================================
// 12. SCROLL PROGRESS INDICATOR
// ==========================================
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00e5ff, #2979ff, #7c4dff);
    z-index: 99999;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ==========================================
// 13. BACK TO TOP
// ==========================================
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursor();
  initNavigation();
  initMagneticButtons();
  initTiltCards();
  initContactForm();
  initParallax();
  initTypingEffect();
  initScrollProgress();
  initBackToTop();
});
