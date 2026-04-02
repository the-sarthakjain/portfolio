/* ========================================
   SARTHAK PORTFOLIO — JavaScript
   Scroll Animations, Modal, Chat, Navbar
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Scroll-triggered Fade-Up Animations
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));


  // ==========================================
  // 2. Navbar Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load


  // ==========================================
  // 3. Mobile Nav Toggle
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });


  // ==========================================
  // 4. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = 80; // account for fixed navbar
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ==========================================
  // 5. Project Modal
  // ==========================================
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalLink = document.getElementById('modalLink');
  const modalHeader = document.getElementById('modalHeader');

  // Open modal from project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const description = card.dataset.description;
      const url = card.dataset.url;
      const gradient = card.dataset.gradient;

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalLink.href = url;
      modalHeader.style.background = gradient;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // ==========================================
  // 6. Chat Room (Local Demo)
  // ==========================================
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  const sendChatMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    // Create sent message
    const msgEl = document.createElement('div');
    msgEl.classList.add('chat-message', 'sent');
    msgEl.textContent = text;
    chatMessages.appendChild(msgEl);

    chatInput.value = '';

    // Auto-scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate a reply after a short delay
    setTimeout(() => {
      const replies = [
        "Thanks for your message! I'll get back to you soon 😊",
        "That sounds interesting! Let's discuss further.",
        "Great to hear from you! Feel free to reach out anytime.",
        "Noted! I appreciate you taking the time to write.",
        "Hey! Thanks for stopping by my portfolio 🚀",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyEl = document.createElement('div');
      replyEl.classList.add('chat-message', 'received');

      const authorEl = document.createElement('div');
      authorEl.classList.add('msg-author');
      authorEl.textContent = 'Sarthak';
      replyEl.appendChild(authorEl);

      replyEl.appendChild(document.createTextNode(randomReply));
      chatMessages.appendChild(replyEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1200);
  };

  chatSendBtn.addEventListener('click', sendChatMessage);

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });


  // ==========================================
  // 7. Profile Card & About Card 3D Effect
  // ==========================================
  const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
  const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
  const adjust = (value, fromMin, fromMax, toMin, toMax) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

  const updateCardTransform = (offsetX, offsetY, wrap) => {
    const width = wrap.clientWidth;
    const height = wrap.clientHeight;

    const percentX = clamp((100 / width) * offsetX);
    const percentY = clamp((100 / height) * offsetY);

    const centerX = percentX - 50;
    const centerY = percentY - 50;

    wrap.style.setProperty("--pointer-x", `${percentX}%`);
    wrap.style.setProperty("--pointer-y", `${percentY}%`);
    wrap.style.setProperty("--background-x", `${adjust(percentX, 0, 100, 35, 65)}%`);
    wrap.style.setProperty("--background-y", `${adjust(percentY, 0, 100, 35, 65)}%`);
    wrap.style.setProperty("--pointer-from-center", `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`);
    wrap.style.setProperty("--pointer-from-top", `${percentY / 100}`);
    wrap.style.setProperty("--pointer-from-left", `${percentX / 100}`);
    wrap.style.setProperty("--rotate-x", `${round(-(centerX / 5))}deg`);
    wrap.style.setProperty("--rotate-y", `${round(centerY / 4)}deg`);
  };

  document.querySelectorAll('.pc-card-wrapper').forEach(wrap => {
    const card = wrap.querySelector('.pc-card');
    if (!card) return;

    // Initial default state
    updateCardTransform(wrap.clientWidth * 0.8, 60, wrap);

    wrap.addEventListener('pointerenter', () => {
      wrap.classList.add("active");
      card.classList.add("active");
    });

    let isTracking = false;
    wrap.addEventListener('pointermove', (e) => {
      if (!isTracking) {
        isTracking = true;
        requestAnimationFrame(() => {
          const rect = wrap.getBoundingClientRect();
          updateCardTransform(e.clientX - rect.left, e.clientY - rect.top, wrap);
          isTracking = false;
        });
      }
    });

    const resetCard = () => {
      wrap.classList.remove("active");
      card.classList.remove("active");
      // Soft reset back to center
      updateCardTransform(wrap.clientWidth * 0.5, wrap.clientHeight * 0.5, wrap);
    };

    wrap.addEventListener('pointerleave', resetCard);
    wrap.addEventListener('pointerup', resetCard);
    wrap.addEventListener('pointercancel', resetCard);

    // Mobile Gyroscope Support (Tilt to shimmer)
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        // e.gamma = left/right tilt (-90 to 90)
        // e.beta = front/back tilt (-180 to 180)
        if (e.gamma !== null && e.beta !== null) {
          wrap.classList.add("active");
          card.classList.add("active");
          
          const width = wrap.clientWidth;
          const height = wrap.clientHeight;
          
          // Map tilt roughly to card pixels
          // gamma: -30 (left) to 30 (right) -> 0 to width
          // beta: 0 (flat) to 60 (tilted up) -> 0 to height
          let mappedX = ((clamp(e.gamma, -30, 30) + 30) / 60) * width;
          let mappedY = ((clamp(e.beta, 10, 70) - 10) / 60) * height;

          if (!isTracking) {
            isTracking = true;
            requestAnimationFrame(() => {
              updateCardTransform(mappedX, mappedY, wrap);
              isTracking = false;
            });
          }
        }
      });
    }
  });


  // ==========================================
  // 8. 2D Lanyard Pull Effect
  // ==========================================
  const lanyardCard = document.getElementById('lanyardCard');
  const lanyardString = document.getElementById('lanyardString');

  if (lanyardCard && lanyardString) {
    let isDraggingLanyard = false;
    let lanyardStartY = 0;
    let lanyardStartX = 0;

    const handleDown = (e) => {
      isDraggingLanyard = true;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      lanyardStartY = clientY;
      lanyardStartX = clientX;
      lanyardCard.classList.add('dragging');
      lanyardString.classList.add('dragging');
    };

    const handleMove = (e) => {
      if (!isDraggingLanyard) return;

      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

      let deltaY = clientY - lanyardStartY;
      let deltaX = clientX - lanyardStartX;

      // Restrict pull mostly downwards
      deltaY = Math.max(-10, Math.min(deltaY, 120));
      // Restrict swing sideways
      deltaX = Math.max(-60, Math.min(deltaX, 60));

      // Apply transforms
      lanyardCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX / 6}deg) rotateX(${deltaY / 4}deg)`;

      // Update string length and angle based on drag
      lanyardString.style.height = `${50 + deltaY}px`;
      lanyardString.style.transform = `rotate(${deltaX / 3}deg)`;
    };

    const handleUp = () => {
      if (!isDraggingLanyard) return;
      isDraggingLanyard = false;
      lanyardCard.classList.remove('dragging');
      lanyardString.classList.remove('dragging');

      // Snap back using CSS transition
      lanyardCard.style.transform = '';
      lanyardString.style.height = '50px';
      lanyardString.style.transform = '';
    };

    lanyardCard.addEventListener('mousedown', handleDown);
    lanyardCard.addEventListener('touchstart', handleDown, { passive: true });

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: true });

    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
  }


  // ==========================================
  // 9. Fish Scrollytelling Animation
  // ==========================================
  const fishCanvas = document.getElementById('fishCanvas');
  if (fishCanvas) {
    const ctx = fishCanvas.getContext('2d');
    const frameCount = 32;
    // Sequential sequence matching your new upload
    const fishFrames = [
      'ezgif-frame-001_no_bg_h5f3zyom.png',
      'ezgif-frame-002_no_bg_hq8ig6ig.png',
      'ezgif-frame-003_no_bg_jt53drj4.png',
      'ezgif-frame-004_no_bg_naoj9x87.png',
      'ezgif-frame-005_no_bg_6ogzhxpz.png',
      'ezgif-frame-006_no_bg_7gpfgxjn.png',
      'ezgif-frame-007_no_bg_3lq6yaqb.png',
      'ezgif-frame-008_no_bg_vh4ud03a.png',
      'ezgif-frame-009_no_bg_gv18tlev.png',
      'ezgif-frame-010_no_bg_5u6vxfcv.png',
      'ezgif-frame-011_no_bg_k9o8vifd.png',
      'ezgif-frame-012_no_bg_7nqxzko8.png',
      'ezgif-frame-013_no_bg_693zmxgm.png',
      'ezgif-frame-014_no_bg_jx4jsbtc.png',
      'ezgif-frame-015_no_bg_xb7w99rd.png',
      'ezgif-frame-016_no_bg_oh4acikt.png',
      'ezgif-frame-017_no_bg_c4l7cox3.png',
      'ezgif-frame-018_no_bg_nriholfg.png',
      'ezgif-frame-019_no_bg_8lh4mukd.png',
      'ezgif-frame-020_no_bg_navu0w88.png',
      'ezgif-frame-021_no_bg_th2osyk8.png',
      'ezgif-frame-022_no_bg_3nrst7y8.png',
      'ezgif-frame-023_no_bg_c12w38zi.png',
      'ezgif-frame-024_no_bg_lncz91jv.png',
      'ezgif-frame-025_no_bg_8ixig4uh.png',
      'ezgif-frame-026_no_bg_ddcqwn20.png',
      'ezgif-frame-027_no_bg_gnfl4bb3.png',
      'ezgif-frame-028_no_bg_xu9davgr.png',
      'ezgif-frame-029_no_bg_pvdeqfjv.png',
      'ezgif-frame-030_no_bg_k5u4rrmi.png',
      'ezgif-frame-031_no_bg_vkxspf52.png',
      'ezgif-frame-032_no_bg_1ulcafht.png'
    ];

    const images = [];
    let imagesLoaded = 0;

    const resizeCanvas = () => {
      fishCanvas.width = window.innerWidth;
      fishCanvas.height = window.innerHeight;
      renderFish();
    };

    const renderFish = () => {
      if (imagesLoaded < frameCount) return;

      const homeEl = document.getElementById('home');
      if (!homeEl) return;

      // Calculate scroll fraction between top (0) and home section bottom
      // This means fish animation scrubs completely while still in home section
      const maxScroll = homeEl.offsetHeight;
      let scrollFraction = window.scrollY / maxScroll;

      // Hide canvas entirely if scrolled past the Home section completely
      if (window.scrollY >= maxScroll) {
        fishCanvas.classList.add('hidden');
      } else {
        fishCanvas.classList.remove('hidden');
      }

      // Clamp between 0 and 1
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));

      const img = images[frameIndex];

      ctx.clearRect(0, 0, fishCanvas.width, fishCanvas.height);

      // Keep it a bit small to prevent pixelation, e.g. cover half the screen width at max
      const baseWidth = Math.min(window.innerWidth * 0.7, 1000);
      const scale = baseWidth / img.width;
      const imgW = img.width * scale;
      const imgH = img.height * scale;

      // Center the fish
      const x = (fishCanvas.width - imgW) / 2;
      const y = (fishCanvas.height - imgH) / 2;

      ctx.drawImage(img, x, y, imgW, imgH);
    };

    fishFrames.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) renderFish();
      };
      img.src = `./fish_animate/${src}`;
      images.push(img);
    });

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', () => {
      requestAnimationFrame(renderFish);
    }, { passive: true });

    // Initial draw
    resizeCanvas();

    // Mouse follow tracker
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      // Shifting up to 40px backwards and forwards
      targetX = (e.clientX / window.innerWidth - 0.5) * 80;
      targetY = (e.clientY / window.innerHeight - 0.5) * 80;
    });

    const updateMouseFollow = () => {
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      fishCanvas.style.setProperty('--mouse-x', `${currentX}px`);
      fishCanvas.style.setProperty('--mouse-y', `${currentY}px`);

      requestAnimationFrame(updateMouseFollow);
    };

    updateMouseFollow();
  }


  // ==========================================
  // 10. Active Nav Link Highlight on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (link) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          link.style.color = 'var(--text-primary)';
        } else {
          link.style.color = '';
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

});
