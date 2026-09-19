112TH ANNIVERSARY RESPONSIVE SITE
================================

FILES
-----
index.html
styles.css
script.js
assets/112-anniversary-desktop.png
assets/112-anniversary-mobile.png

RESPONSIVE IMAGE RULES
----------------------
Mobile, 767px wide and below:
  assets/112-anniversary-mobile.png

Tablet and desktop, 768px wide and above:
  assets/112-anniversary-desktop.png

The page fills the browser window and uses object-fit: cover so no blank bars appear.
The mobile portrait image is used for phones. The desktop landscape image is used for tablets and desktop displays.

HOW TO RUN
----------
Open index.html in a browser.
For deployment, upload the entire folder without changing its internal structure.

OPTIONAL COUNTDOWN
------------------
The package includes a countdown-ready overlay, disabled by default.

Open script.js and update:

const COUNTDOWN_CONFIG = {
  enabled: true,
  targetDate: '2027-03-12T19:00:00-04:00'
};

Replace the example targetDate with the correct event date, time, and UTC offset.

NOTES
-----
- Image preload links reduce visible loading delay.
- The page supports phone safe areas and dynamic viewport heights.
- The background remains visible when JavaScript is disabled.
- The artwork is decorative, so it is hidden from screen readers while the page retains an accessible label.
