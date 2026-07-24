// Miami event date: March 12, 2027 at 12:00 AM Eastern Standard Time.
const EVENT_DATE = new Date('2027-03-12T00:00:00-05:00').getTime();

const el = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

const pad = (value, length = 2) => String(value).padStart(length, '0');

function updateCountdown() {
  const now = Date.now();
  let remaining = EVENT_DATE - now;

  if (remaining <= 0) {
    document.body.classList.add('is-complete');
    remaining = 0;
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const minuteMs = 60 * 1000;
  const secondMs = 1000;

  const days = Math.floor(remaining / dayMs);
  remaining %= dayMs;

  const hours = Math.floor(remaining / hourMs);
  remaining %= hourMs;

  const minutes = Math.floor(remaining / minuteMs);
  remaining %= minuteMs;

  const seconds = Math.floor(remaining / secondMs);
  const tenths = Math.floor((remaining % secondMs) / 100);

  el.days.textContent = pad(days, 3);
  el.hours.textContent = pad(hours);
  el.minutes.textContent = pad(minutes);
  el.seconds.textContent = `${pad(seconds)}.${tenths}`;
}

updateCountdown();
setInterval(updateCountdown, 100);
