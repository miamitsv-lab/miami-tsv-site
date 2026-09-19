TSV VIDEO CAROUSEL - VIDEO URL / DRAFT INSTRUCTIONS
===================================================

MAIN FILE
---------
landing-page-tsv-video-group-updated.html

CURRENT VIDEO LOCATIONS
-----------------------
Crimping:
  tsv-competition-group-videos/crimping.mp4

Signal Flow:
  tsv-competition-group-videos/signal-flow.mp4

WebEx TEMPORARY DRAFT:
  tsv-competition-group-videos/webex-draft.mp4

Place those MP4 files inside this folder relative to the HTML page:

  tsv-competition-group-videos/
    crimping.mp4
    signal-flow.mp4
    webex-draft.mp4

WEBEX DRAFT BEHAVIOR
--------------------
The WebEx slide now plays the draft video, but the picture is intentionally
washed out/desaturated so viewers can immediately recognize that it is not
final.

The video also displays:

  DRAFT ONLY
  WebEx Draft Preview • Final Video Coming Soon

and below the player:

  Draft preview only — final WebEx video is coming soon.

The video controls remain usable.

HOW TO PUBLISH THE FINAL WEBEX VIDEO LATER
------------------------------------------
1. Upload the final WebEx MP4 to your web server.
2. Open landing-page-tsv-video-group-updated.html in a text editor.
3. Search for:

   PASTE_FINAL_WEBEX_VIDEO_URL_HERE

4. Replace ONLY that placeholder with the real final MP4 path.

Example:

   tsv-competition-group-videos/webex.mp4

Once a real final path replaces the placeholder, the page automatically:
- loads the final WebEx video instead of the draft
- removes the washed-out draft appearance
- removes the DRAFT ONLY overlay
- removes the Final Video Coming Soon draft message

You do not need to delete the draft file immediately; it simply will not be
used once the final URL is active.

PRELOADING / FAST STARTUP
-------------------------
All three current video elements use:

  preload="auto"

The page also calls video.load() on page load to ask the browser to begin
buffering the MP4 files as early as browser policy permits.

For best playback, encode as:
- MP4 container
- H.264 video
- AAC audio
- 1280x720 (720p)
- approximately 2.5-4 Mbps video bitrate
- Web/Fast Start optimization enabled

The video host/server should support HTTP byte-range requests. No webpage can
guarantee zero buffering on every connection because startup still depends on
network speed, browser policy, file bitrate/size, and server performance.

CAROUSEL START BEHAVIOR
-----------------------
- Automatic popup: starts on a RANDOM Crimping, Signal Flow, or WebEx slide.
- Main "Watch TSV Group Videos" button: starts on a RANDOM group each time.
- Crimping tile "Watch Video": opens Crimping directly.
- Signal Flow tile "Watch Video": opens Signal Flow directly.
- WebEx tile "Watch Video": opens the WebEx draft directly.

PROGRESS DISPLAY
----------------
Crimping: Completed — progress bar 100%
Signal Flow: Completed — progress bar 100%
WebEx: Almost — progress bar 100%
