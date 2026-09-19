INC 112TH ANNIVERSARY VIDEO CAROUSEL SLIDE

FILES
- index.html
- assets/inc-112-video-16x9.mp4

HOW TO USE
1. Keep the index.html file and assets folder together.
2. Upload the entire folder to the same web server as your carousel.
3. Add index.html as another carousel page or iframe slide.

EXAMPLE IFRAME
<iframe
  src="inc-112-video-carousel-slide/index.html"
  title="112th Anniversary Video"
  allow="autoplay; fullscreen"
  loading="eager">
</iframe>

OPTIONAL URL SETTINGS
- index.html?controls=1  Show video controls.
- index.html?loop=1      Loop continuously.
- index.html?muted=0     Request sound. Autoplay with sound may be blocked.

CAROUSEL END EVENT
When the video finishes, the page sends this postMessage to the parent page:

{
  source: "html-video-carousel-slide",
  type: "video-ended"
}

Use this in the parent carousel to advance immediately:

window.addEventListener("message", (event) => {
  if (
    event.data?.source === "html-video-carousel-slide" &&
    event.data?.type === "video-ended"
  ) {
    goToNextSlide(); // Replace with your carousel's next-slide function.
  }
});

OPTIONAL PARENT CONTROLS
Send these messages to the iframe window:
- { type: "carousel:play" }
- { type: "carousel:pause" }
- { type: "carousel:reset" }
- { type: "carousel:restart" }

The video is muted by default because browsers normally allow autoplay only when muted.
