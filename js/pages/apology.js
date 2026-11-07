/* ========================================
   APOLOGY CAROUSEL
======================================== */

export function initPage({ navigateTo }) {
  // Elements
  const carouselTrack = document.getElementById("carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");

  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");

  const indicators = document.querySelectorAll(".carousel-dot");
  const slideCounter = document.getElementById("slide-counter");

  const continueButton = document.getElementById("continue-reflection");

  if (continueButton) {
    continueButton.addEventListener("click", () => {
      navigateTo("reflection");
    });
  }
  // State
  let currentSlide = 0;
  const totalSlides = slides.length;

  /* ========================================
       UPDATE CAROUSEL
    ======================================== */

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update visible slide animation
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-visible", index === currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);

      if (index === currentSlide) {
        indicator.setAttribute("aria-current", "step");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

    prevButton.disabled = currentSlide === 0;

    // Detectar si estamos en la última diapositiva
    const isLastSlide = currentSlide === totalSlides - 1;

    // Alternar los botones
    nextButton.hidden = isLastSlide;
    continueButton.hidden = !isLastSlide;
  }

  /* ========================================
       NAVIGATION
    ======================================== */

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  /* ========================================
       INDICATORS
    ======================================== */

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      currentSlide = Number(indicator.dataset.slide);

      updateCarousel();
    });
  });

  /* ========================================
       KEYBOARD NAVIGATION
    ======================================== */

  function handleKeyboard(event) {
    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      prevSlide();
    }
  }

  document.addEventListener("keydown", handleKeyboard);

  // Initial state
  updateCarousel();
}
