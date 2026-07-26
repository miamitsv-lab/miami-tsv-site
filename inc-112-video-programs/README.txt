112TH ANNIVERSARY LOOPING VIDEO SLIDE

CONTENTS
--------
index.html
assets/inc-112-video-16x9.mp4

HOW TO OPEN
-----------
Open index.html in a browser.

HOW TO ADD TO AN HTML CAROUSEL
------------------------------
Place this entire folder beside your main carousel HTML.

Example iframe:

<iframe
  src="inc-112-video-loop-slide/index.html"
  title="112th Anniversary Video"
  allow="autoplay; fullscreen"
  loading="eager">
</iframe>

IMPORTANT
---------
Keep the assets folder and video file in the same structure.
The video autoplays muted and loops continuously.

Because the video loops, it will not send an "ended" event.
The main carousel should decide when to switch to the next slide.
