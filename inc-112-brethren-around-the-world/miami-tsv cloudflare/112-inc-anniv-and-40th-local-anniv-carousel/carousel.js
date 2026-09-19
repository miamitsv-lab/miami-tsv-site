'use strict';

/*
  DISPLAY TIMES
  -------------
  Slide 1: 112th Anniversary Thanksgiving = 60 seconds
  Slide 2: Miami 40th Anniversary countdown = 15 seconds
*/
const SLIDE_DURATIONS = [60_000, 15_000];

const slides = Array.from(document.querySelectorAll('.carousel__slide'));
const dots = Array.from(document.querySelectorAll('.carousel__dot'));

let currentSlide = 0;
let timerId = null;
let timerStartedAt = 0;
let remainingTime = SLIDE_DURATIONS[currentSlide];

function updateSlideState(index) {
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === index;
    const frame = slide.querySelector('.carousel__frame');

    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));

    if (frame) {
      frame.tabIndex = isActive ? 0 : -1;
    }
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', String(isActive));
  });
}

function clearSlideTimer() {
  if (timerId !== null) {
    window.clearTimeout(timerId);
    timerId = null;
  }
}

function scheduleNextSlide(delay = SLIDE_DURATIONS[currentSlide]) {
  clearSlideTimer();
  remainingTime = delay;
  timerStartedAt = performance.now();

  timerId = window.setTimeout(() => {
    showSlide((currentSlide + 1) % slides.length);
  }, delay);
}

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = ((index % slides.length) + slides.length) % slides.length;
  updateSlideState(currentSlide);
  scheduleNextSlide(SLIDE_DURATIONS[currentSlide]);
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const target = Number(dot.dataset.slideTarget);
    if (Number.isInteger(target)) showSlide(target);
  });
});

/* Pause the automatic timer while the browser tab is hidden. */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (timerId !== null) {
      const elapsed = performance.now() - timerStartedAt;
      remainingTime = Math.max(0, remainingTime - elapsed);
      clearSlideTimer();
    }
    return;
  }

  scheduleNextSlide(remainingTime || SLIDE_DURATIONS[currentSlide]);
});

/* Keyboard navigation does not add any visible controls. */
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    showSlide(currentSlide + 1);
  } else if (event.key === 'ArrowLeft') {
    showSlide(currentSlide - 1);
  }
});

updateSlideState(currentSlide);
scheduleNextSlide(SLIDE_DURATIONS[currentSlide]);
