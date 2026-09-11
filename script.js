// ==========================================================================
// YOGYM — Interactive Logic & Application Controls
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Hero 3D Art Mouse Parallax ---
  const art = document.querySelector('.hero-art');
  if (art) {
    document.addEventListener('mousemove', (event) => {
      if (window.innerWidth < 820) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * -10;
      art.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }

  // --- 2. Mobile Navigation Drawer ---
  const menuToggle = document.querySelector('#menu-toggle');
  const mobileDrawer = document.querySelector('#mobile-drawer');
  const drawerClose = document.querySelector('#drawer-close');
  const drawerBackdrop = document.querySelector('#drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-links a, .drawer-actions a');

  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // --- 3. Scroll Reveal Animations (IntersectionObserver) ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .class-row, .benefit-grid article, .programme-grid article, .gallery-card, .membership-duration article, .membership-services article').forEach((el) => {
    observer.observe(el);
  });

  // --- 4. Interactive BMI Calculator ---
  const bmiForm = document.querySelector('#bmi-form');
  const bmiResult = document.querySelector('#bmi-result');
  if (bmiForm && bmiResult) {
    bmiForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const heightInput = document.querySelector('#bmi-height');
      const weightInput = document.querySelector('#bmi-weight');
      const height = Number(heightInput?.value) / 100;
      const weight = Number(weightInput?.value);
      const bmi = weight / (height * height);

      if (!Number.isFinite(bmi) || bmi <= 0) {
        bmiResult.innerHTML = `<strong>Invalid input</strong><span>Please enter valid height and weight values.</span>`;
        return;
      }

      let category = 'Healthy weight';
      let suggestion = 'Maintain your routine with balanced training, nourishing meals, quality sleep and regular check-ins with a qualified coach.';

      if (bmi < 18.5) {
        category = 'Below adult healthy-weight range';
        suggestion = 'Consider a progressive strength-focused programme paired with caloric surplus support.';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Above adult healthy-weight range';
        suggestion = 'Build a consistent routine with resistance training, functional cardio, and mindful nutrition.';
      } else if (bmi >= 30) {
        category = 'Higher adult BMI range';
        suggestion = 'Start with low-impact yoga, mobility and supervised strength conditioning to build longevity.';
      }

      bmiResult.innerHTML = `<strong>${bmi.toFixed(1)} — ${category}</strong><span>${suggestion} BMI is a general screening guide, not a medical diagnosis.</span>`;
    });
  }

  // --- 5. Testimonial Reviews Slider ---
  const reviewSlides = Array.from(document.querySelectorAll('.review-slide'));
  const previousReview = document.querySelector('.review-prev');
  const nextReview = document.querySelector('.review-next');
  const reviewIndex = document.querySelector('.review-index');
  let currentReview = 0;

  const showReview = (index) => {
    if (!reviewSlides.length) return;
    currentReview = (index + reviewSlides.length) % reviewSlides.length;
    reviewSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentReview);
    });
    if (reviewIndex) {
      reviewIndex.textContent = `${String(currentReview + 1).padStart(2, '0')} / ${String(reviewSlides.length).padStart(2, '0')}`;
    }
  };

  previousReview?.addEventListener('click', () => showReview(currentReview - 1));
  nextReview?.addEventListener('click', () => showReview(currentReview + 1));
  if (reviewSlides.length) {
    setInterval(() => showReview(currentReview + 1), 6000);
  }

  // --- 6. Enquiry Form Actions (WhatsApp Instant Chat & Email) ---
  const enquiryForm = document.querySelector('#enquiry-form');
  const enquiryWhatsapp = document.querySelector('#enquiry-whatsapp');
  const formStatus = document.querySelector('#form-status');

  const getFormData = () => {
    const name = document.querySelector('#enquiry-name')?.value.trim() || '';
    const phone = document.querySelector('#enquiry-phone')?.value.trim() || '';
    const programme = document.querySelector('#enquiry-programme')?.value || 'Gym + Yoga Combo';
    const message = document.querySelector('#enquiry-message')?.value.trim() || '';
    return { name, phone, programme, message };
  };

  enquiryWhatsapp?.addEventListener('click', () => {
    const { name, phone, programme, message } = getFormData();
    if (!name || !phone) {
      if (formStatus) {
        formStatus.className = 'form-status is-success';
        formStatus.style.background = 'rgba(231, 76, 60, 0.2)';
        formStatus.style.borderColor = '#e74c3c';
        formStatus.style.color = '#ff8f8f';
        formStatus.textContent = 'Please provide your full name and phone number to start WhatsApp chat.';
      }
      return;
    }

    let text = `Hi Yogym, my name is ${name} (${phone}). I am interested in the ${programme} programme.`;
    if (message) text += ` Note: ${message}`;

    const url = `https://wa.me/917019292002?text=${encodeURIComponent(text)}`;
    if (formStatus) {
      formStatus.className = 'form-status is-success';
      formStatus.style.background = 'rgba(37, 211, 102, 0.15)';
      formStatus.style.borderColor = 'rgba(37, 211, 102, 0.4)';
      formStatus.style.color = '#5ce68f';
      formStatus.textContent = '✓ Redirecting to WhatsApp to chat with our team...';
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  enquiryForm?.addEventListener('submit', () => {
    if (formStatus) {
      formStatus.className = 'form-status is-success';
      formStatus.style.background = 'rgba(37, 211, 102, 0.15)';
      formStatus.style.borderColor = 'rgba(37, 211, 102, 0.4)';
      formStatus.style.color = '#5ce68f';
      formStatus.textContent = '✓ Opening your email client to send your enquiry. You can also chat directly on WhatsApp!';
    }
  });

  // --- 7. Fullscreen Animated Masonry Photo Gallery Lightbox ---
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.querySelector('#lightbox-modal');
  const lightboxBackdrop = document.querySelector('#lightbox-backdrop');
  const lightboxClose = document.querySelector('#lightbox-close');
  const lightboxPrev = document.querySelector('#lightbox-prev');
  const lightboxNext = document.querySelector('#lightbox-next');
  const lightboxImg = document.querySelector('#lightbox-img');
  const lightboxTag = document.querySelector('#lightbox-tag');
  const lightboxTitle = document.querySelector('#lightbox-title');
  const lightboxDesc = document.querySelector('#lightbox-desc');
  const lightboxCounter = document.querySelector('#lightbox-counter');

  let currentGalleryIndex = 0;

  const getGalleryItemData = (index) => {
    const card = galleryCards[index];
    if (!card) return null;
    const img = card.querySelector('img');
    const tag = card.dataset.tag || card.querySelector('.gallery-badge')?.textContent || 'Sanctuary';
    const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Som Yogym';
    const desc = card.dataset.desc || card.querySelector('p')?.textContent || '';
    const src = img?.currentSrc || img?.src || '';
    return { src, tag, title, desc };
  };

  const updateLightboxContent = (index) => {
    if (!galleryCards.length) return;
    currentGalleryIndex = (index + galleryCards.length) % galleryCards.length;
    const item = getGalleryItemData(currentGalleryIndex);
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
    }
    if (lightboxTag) lightboxTag.textContent = item.tag;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${String(currentGalleryIndex + 1).padStart(2, '0')} / ${String(galleryCards.length).padStart(2, '0')}`;
    }
  };

  const openLightbox = (index) => {
    updateLightboxContent(index);
    lightboxModal?.classList.add('is-active');
    lightboxModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal?.classList.remove('is-active');
    lightboxModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => openLightbox(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightboxContent(currentGalleryIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightboxContent(currentGalleryIndex + 1);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightboxContent(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') updateLightboxContent(currentGalleryIndex + 1);
  });
});
