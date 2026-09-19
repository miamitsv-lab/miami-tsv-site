'use strict';

/*
  COUNTDOWN SETTINGS
  ------------------
  The background page works without a countdown.

  To enable it:
  1. Change enabled to true.
  2. Enter the correct event date and UTC offset in ISO 8601 format.
     Example: 2027-03-12T19:00:00-04:00
*/
const COUNTDOWN_CONFIG = {
  enabled: false,
  targetDate: '2027-03-12T19:00:00-04:00'
};

const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('#heroBackground');

function showBackground() {
  hero?.classList.add('is-ready');
}

if (heroBackground) {
  if (heroBackground.complete) {
    showBackground();
  } else {
    heroBackground.addEventListener('load', showBackground, { once: true });
    heroBackground.addEventListener('error', showBackground, { once: true });
  }
} else {
  showBackground();
}

function startCountdown() {
  if (!COUNTDOWN_CONFIG.enabled) return;

  const countdown = document.querySelector('#countdown');
  const daysElement = document.querySelector('#days');
  const hoursElement = document.querySelector('#hours');
  const minutesElement = document.querySelector('#minutes');
  const secondsElement = document.querySelector('#seconds');
  const targetTime = Date.parse(COUNTDOWN_CONFIG.targetDate);

  if (
    !countdown ||
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement ||
    Number.isNaN(targetTime)
  ) {
    console.warn('Countdown could not start. Check the target date and markup.');
    return;
  }

  countdown.hidden = false;

  let timerId = null;

  const update = () => {
    const remaining = Math.max(0, targetTime - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');

    if (remaining <= 0) {
      if (timerId !== null) window.clearInterval(timerId);
      countdown.querySelector('.countdown__label').textContent = 'Anniversary Day';
    }
  };

  update();
  timerId = window.setInterval(update, 1000);
}

startCountdown();
