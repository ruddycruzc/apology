/* ========================================
   REFLECTION CAROUSEL
======================================== */

export function initPage({ navigateTo }) {
  // Elements
  const reflectionTrack = document.getElementById("reflection-track");
  const slides = document.querySelectorAll(".reflection-slide");

  const prevButton = document.getElementById("reflection-prev");
  const nextButton = document.getElementById("reflection-next");

  const indicators = document.querySelectorAll(".reflection-dot");
  const slideCounter = document.getElementById("reflection-counter");

  const continueButton = document.getElementById("continue-question");

  // State
  let currentSlide = 0;
  const totalSlides = slides.length;

  /* ========================================
       UPDATE CAROUSEL
    ======================================== */

  function updateCarousel() {
    reflectionTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    // Animate the content of the current slide
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-visible", index === currentSlide);
    });
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);

      if (index === currentSlide) {
        indicator.setAttribute("aria-current", "step");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    // Update counter
    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

    // Update navigation
    prevButton.disabled = currentSlide === 0;

    // Hide next button on the last slide
    nextButton.hidden = currentSlide === totalSlides - 1;
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

  /* ========================================
       CONTINUE TO NEXT PAGE
    ======================================== */

  continueButton.addEventListener("click", () => {
    navigateTo("question");
  });

  // Initial state
  updateCarousel();
}
