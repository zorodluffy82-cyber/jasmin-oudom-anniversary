/* =========================================================
   JASMIN ♡ OUDOM — ANNIVERSARY WEBSITE
   All of the love, in JavaScript.
   ========================================================= */

"use strict";

/* -----------------------------
   Easy-to-edit settings
   ----------------------------- */

const CONFIG = {
  relationshipStart: new Date(2024, 11, 22, 0, 0, 0), // 22 December 2024
  anniversaryMonth: 11, // JavaScript months start at 0 (11 = December)
  anniversaryDay: 22,
  firstAnniversaryYear: 2025,
  songUrl: "https://youtu.be/T4dM9k7u6qs",
  youtubeVideoId: "T4dM9k7u6qs",
  slideshowDelay: 5500
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -----------------------------
   Tiny helpers
   ----------------------------- */

function pad(number) {
  return String(number).padStart(2, "0");
}

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

function isSameDay(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

let toastTimer;
function showToast(message, duration = 2800) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, duration);
}

/* -----------------------------
   Header + mobile menu
   ----------------------------- */

const header = $("#siteHeader");
const menuButton = $("#menuButton");
const mainNav = $("#mainNav");

function closeMenu() {
  if (!menuButton || !mainNav) return;
  menuButton.classList.remove("is-open");
  mainNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  $$("a", mainNav).forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      mainNav.classList.contains("is-open") &&
      !mainNav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* -----------------------------
   Reveal on scroll
   ----------------------------- */

const revealItems = $$(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* -----------------------------
   Live "together" counter
   ----------------------------- */

const daysTogetherEl = $("#daysTogether");
const togetherHoursEl = $("#togetherHours");
const togetherMinutesEl = $("#togetherMinutes");
const togetherSecondsEl = $("#togetherSeconds");
const heroDaysEl = $("#heroDays");

function updateTogetherCounter() {
  const now = new Date();
  const elapsed = Math.max(0, now.getTime() - CONFIG.relationshipStart.getTime());

  const totalSeconds = Math.floor(elapsed / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (daysTogetherEl) daysTogetherEl.textContent = formatNumber(days);
  if (togetherHoursEl) togetherHoursEl.textContent = pad(hours);
  if (togetherMinutesEl) togetherMinutesEl.textContent = pad(minutes);
  if (togetherSecondsEl) togetherSecondsEl.textContent = pad(seconds);
  if (heroDaysEl) heroDaysEl.textContent = formatNumber(days);
}

updateTogetherCounter();
window.setInterval(updateTogetherCounter, 1000);

/* -----------------------------
   Anniversary countdown
   ----------------------------- */

const countdownDaysEl = $("#countdownDays");
const countdownHoursEl = $("#countdownHours");
const countdownMinutesEl = $("#countdownMinutes");
const countdownSecondsEl = $("#countdownSeconds");
const nextAnniversaryDateEl = $("#nextAnniversaryDate");
const countdownIntroEl = $("#countdownIntro");

function getNextAnniversary(now) {
  let year = Math.max(now.getFullYear(), CONFIG.firstAnniversaryYear);
  let target = new Date(year, CONFIG.anniversaryMonth, CONFIG.anniversaryDay, 0, 0, 0);

  if (target.getTime() < now.getTime() && !isSameDay(target, now)) {
    target = new Date(year + 1, CONFIG.anniversaryMonth, CONFIG.anniversaryDay, 0, 0, 0);
  }

  return target;
}

function updateCountdown() {
  const now = new Date();
  const anniversaryToday =
    now.getMonth() === CONFIG.anniversaryMonth &&
    now.getDate() === CONFIG.anniversaryDay;

  if (anniversaryToday) {
    if (countdownDaysEl) countdownDaysEl.textContent = "000";
    if (countdownHoursEl) countdownHoursEl.textContent = "00";
    if (countdownMinutesEl) countdownMinutesEl.textContent = "00";
    if (countdownSecondsEl) countdownSecondsEl.textContent = "00";
    if (nextAnniversaryDateEl) nextAnniversaryDateEl.textContent = "Today • December 22";
    if (countdownIntroEl) {
      countdownIntroEl.textContent = "Today is our day. Happy anniversary, my love.";
    }
    return;
  }

  const target = getNextAnniversary(now);
  const difference = Math.max(0, target.getTime() - now.getTime());

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (countdownDaysEl) countdownDaysEl.textContent = String(days).padStart(3, "0");
  if (countdownHoursEl) countdownHoursEl.textContent = pad(hours);
  if (countdownMinutesEl) countdownMinutesEl.textContent = pad(minutes);
  if (countdownSecondsEl) countdownSecondsEl.textContent = pad(seconds);

  if (nextAnniversaryDateEl) {
    nextAnniversaryDateEl.textContent = target.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  if (countdownIntroEl) {
    countdownIntroEl.textContent =
      "The next chapter of our anniversary story is on its way.";
  }
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

/* -----------------------------
   Floating hearts
   ----------------------------- */

const heartsLayer = $("#floatingHearts");
const heartGlyphs = ["♡", "♥", "♡", "❥", "♡"];

function spawnHeart() {
  if (!heartsLayer || reducedMotion) return;
  if (heartsLayer.childElementCount > 16) return;

  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = heartGlyphs[Math.floor(Math.random() * heartGlyphs.length)];

  const duration = 8 + Math.random() * 7;
  const size = 10 + Math.random() * 20;
  const drift = -60 + Math.random() * 120;

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty("--duration", `${duration}s`);
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.setProperty("--opacity", String(0.22 + Math.random() * 0.45));
  heart.style.animationDelay = `${Math.random() * 1.2}s`;

  heartsLayer.appendChild(heart);
  window.setTimeout(() => heart.remove(), (duration + 1.5) * 1000);
}

if (!reducedMotion) {
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(spawnHeart, i * 500);
  }
  window.setInterval(spawnHeart, 1350);
}

function burstHearts(x, y, count = 10) {
  if (reducedMotion) return;

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-burst";
    heart.textContent = i % 3 === 0 ? "♥" : "♡";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.setProperty("--x", `${-70 + Math.random() * 140}px`);
    heart.style.setProperty("--y", `${-90 - Math.random() * 80}px`);
    heart.style.setProperty("--r", `${-60 + Math.random() * 120}deg`);
    heart.style.animationDelay = `${Math.random() * 0.12}s`;

    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1300);
  }
}

const exploreButton = $("#exploreButton");
if (exploreButton) {
  exploreButton.addEventListener("click", (event) => {
    burstHearts(event.clientX, event.clientY, 12);
  });
}

/* -----------------------------
   Gallery + lightbox
   ----------------------------- */

const galleryItems = $$(".gallery__item");
const photos = galleryItems.map((item) => {
  const image = $("img", item);
  return {
    src: image ? image.getAttribute("src") : "",
    alt: image ? image.getAttribute("alt") : "",
    caption: item.dataset.caption || ""
  };
});

const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
const lightboxCaption = $("#lightboxCaption");
const lightboxCounter = $("#lightboxCounter");
const lightboxClose = $("#lightboxClose");
const lightboxBackdrop = $("#lightboxBackdrop");
const lightboxPrev = $("#lightboxPrev");
const lightboxNext = $("#lightboxNext");

let lightboxIndex = 0;
let lastFocusedElement = null;

function renderLightbox(index) {
  if (!photos.length) return;

  lightboxIndex = (index + photos.length) % photos.length;
  const photo = photos[lightboxIndex];

  if (lightboxImage) {
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
  }
  if (lightboxCaption) lightboxCaption.textContent = photo.caption;
  if (lightboxCounter) {
    lightboxCounter.textContent = `${pad(lightboxIndex + 1)} / ${pad(photos.length)}`;
  }
}

function openLightbox(index) {
  if (!lightbox) return;

  lastFocusedElement = document.activeElement;
  renderLightbox(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");

  if (lightboxClose) {
    window.setTimeout(() => lightboxClose.focus(), 50);
  }

  const rect = lightbox.getBoundingClientRect();
  burstHearts(rect.width / 2, rect.height / 2, 8);
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener("click", () => renderLightbox(lightboxIndex - 1));
if (lightboxNext) lightboxNext.addEventListener("click", () => renderLightbox(lightboxIndex + 1));

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") renderLightbox(lightboxIndex - 1);
  if (event.key === "ArrowRight") renderLightbox(lightboxIndex + 1);
});

/* Swipe support inside the lightbox */
let lightboxTouchStartX = null;
if (lightbox) {
  lightbox.addEventListener(
    "touchstart",
    (event) => {
      lightboxTouchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (event) => {
      if (lightboxTouchStartX === null) return;
      const difference = event.changedTouches[0].clientX - lightboxTouchStartX;
      if (Math.abs(difference) > 55) {
        renderLightbox(lightboxIndex + (difference < 0 ? 1 : -1));
      }
      lightboxTouchStartX = null;
    },
    { passive: true }
  );
}

/* -----------------------------
   Slideshow
   ----------------------------- */

const slidesContainer = $("#slideshowSlides");
const slideCaption = $("#slideCaption");
const slideCount = $("#slideCount");
const slideDots = $("#slideDots");
const slideProgress = $("#slideProgress");
const prevSlideButton = $("#prevSlide");
const nextSlideButton = $("#nextSlide");
const pauseSlideshowButton = $("#pauseSlideshow");
const slideshowStage = $("#slideshowStage");

let currentSlide = 0;
let slideTimer = null;
let slideshowPaused = false;
let slideshowHovered = false;

function buildSlideshow() {
  if (!slidesContainer || !slideDots) return;

  photos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = `slideshow__slide${index === 0 ? " is-active" : ""}`;
    slide.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" loading="${index < 2 ? "eager" : "lazy"}">`;
    slidesContainer.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `slideshow__dot${index === 0 ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `Show photo ${index + 1}: ${photo.caption}`);
    dot.addEventListener("click", () => {
      showSlide(index);
      restartSlideshowTimer();
    });
    slideDots.appendChild(dot);
  });
}

function showSlide(index, restartTimer = true) {
  if (!photos.length) return;

  currentSlide = (index + photos.length) % photos.length;
  const slides = $$(".slideshow__slide", slidesContainer);
  const dots = $$(".slideshow__dot", slideDots);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
    dot.setAttribute("aria-current", dotIndex === currentSlide ? "true" : "false");
  });

  if (slideCaption) slideCaption.textContent = photos[currentSlide].caption;
  if (slideCount) {
    slideCount.textContent = `${pad(currentSlide + 1)} / ${pad(photos.length)}`;
  }

  if (restartTimer) restartSlideshowTimer();
}

function stopSlideshowTimer() {
  window.clearTimeout(slideTimer);
  slideTimer = null;
  if (slideProgress) slideProgress.classList.remove("is-running");
}

function restartSlideshowTimer() {
  stopSlideshowTimer();

  if (
    reducedMotion ||
    slideshowPaused ||
    slideshowHovered ||
    document.hidden ||
    !photos.length
  ) {
    return;
  }

  if (slideProgress) {
    // Force the CSS animation to restart from zero.
    void slideProgress.offsetWidth;
    slideProgress.classList.add("is-running");
  }

  slideTimer = window.setTimeout(() => {
    showSlide(currentSlide + 1);
  }, CONFIG.slideshowDelay);
}

function setSlideshowPaused(paused) {
  slideshowPaused = paused;

  if (pauseSlideshowButton) {
    pauseSlideshowButton.setAttribute("aria-pressed", String(paused));
    pauseSlideshowButton.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    const icon = $(".pause-icon", pauseSlideshowButton);
    const label = $(".pause-label", pauseSlideshowButton);
    if (icon) icon.textContent = paused ? "▶" : "❚❚";
    if (label) label.textContent = paused ? "Play" : "Pause";
  }

  if (paused) {
    stopSlideshowTimer();
  } else {
    restartSlideshowTimer();
  }
}

buildSlideshow();
showSlide(0, false);
restartSlideshowTimer();

if (prevSlideButton) {
  prevSlideButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });
}

if (nextSlideButton) {
  nextSlideButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });
}

if (pauseSlideshowButton) {
  pauseSlideshowButton.addEventListener("click", () => {
    setSlideshowPaused(!slideshowPaused);
  });
}

if (slideshowStage) {
  slideshowStage.addEventListener("mouseenter", () => {
    slideshowHovered = true;
    stopSlideshowTimer();
  });

  slideshowStage.addEventListener("mouseleave", () => {
    slideshowHovered = false;
    restartSlideshowTimer();
  });

  slideshowStage.addEventListener("focusin", () => {
    slideshowHovered = true;
    stopSlideshowTimer();
  });

  slideshowStage.addEventListener("focusout", () => {
    slideshowHovered = false;
    restartSlideshowTimer();
  });

  let slideTouchStartX = null;
  slideshowStage.addEventListener(
    "touchstart",
    (event) => {
      slideTouchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  slideshowStage.addEventListener(
    "touchend",
    (event) => {
      if (slideTouchStartX === null) return;
      const difference = event.changedTouches[0].clientX - slideTouchStartX;
      if (Math.abs(difference) > 50) {
        showSlide(currentSlide + (difference < 0 ? 1 : -1));
      }
      slideTouchStartX = null;
    },
    { passive: true }
  );
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSlideshowTimer();
  } else {
    restartSlideshowTimer();
  }
});

/* -----------------------------
   Love notes
   ----------------------------- */

const loveNoteText = $("#loveNoteText");
const newLoveNoteButton = $("#newLoveNote");

const loveNotes = [
  "You are the softest place my heart has ever landed. Thank you for making love feel like home.",
  "If I had to choose one person to share every ordinary Tuesday with, I would still choose you. Every single time.",
  "You make my heart feel like it is exactly where it belongs. I am so lucky to love you.",
  "I love the way you laugh, the way you care, and the way you make the world feel a little softer just by being in it.",
  "Some people search their whole lives for what we found. I promise to keep choosing you, even on the days that are not perfect.",
  "You are my favorite hello, my hardest goodbye, and the sweetest part of every day in between.",
  "Thank you for being the person I can be completely myself with. With you, I never have to hide a single part of me.",
  "My favorite place is not a place at all. It is wherever you are, holding my hand.",
  "I do not need a perfect love story. I just need ours — with all its little moments, inside jokes, and quiet promises.",
  "Every day with you is a page I want to read again. Here is to all the chapters still waiting for us."
];

let lastLoveNote = 0;

if (newLoveNoteButton && loveNoteText) {
  newLoveNoteButton.addEventListener("click", (event) => {
    let nextIndex = Math.floor(Math.random() * loveNotes.length);
    if (nextIndex === lastLoveNote) {
      nextIndex = (nextIndex + 1) % loveNotes.length;
    }
    lastLoveNote = nextIndex;

    loveNoteText.classList.add("is-changing");
    window.setTimeout(() => {
      loveNoteText.textContent = loveNotes[nextIndex];
      loveNoteText.classList.remove("is-changing");
    }, 220);

    const rect = newLoveNoteButton.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top, 7);
  });
}

/* -----------------------------
   YouTube background music
   ----------------------------- */

const musicDock = $("#musicDock");
const musicStatus = $("#musicStatus");
const navSong = $(".nav-song");
const musicButtons = $$("[data-music-toggle]");
const songUrl = CONFIG.songUrl;

let youtubePlayer = null;
let youtubeReady = false;
let musicRequested = false;
let youtubeFallback = false;

function updateMusicUI(state) {
  const isPlaying = state === "playing";
  const isLoading = state === "loading";
  const isFallback = state === "fallback";

  if (musicDock) musicDock.classList.toggle("is-playing", isPlaying);
  if (navSong) navSong.classList.toggle("is-playing", isPlaying);

  musicButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute(
      "aria-label",
      isPlaying ? "Pause our song" : isFallback ? "Open our song on YouTube" : "Play our song"
    );
  });

  if (musicStatus) {
    musicStatus.textContent = isPlaying
      ? "Now playing"
      : isLoading
        ? "Loading our song…"
        : isFallback
          ? "Open on YouTube"
          : "Tap to play";
  }
}

function initYouTubePlayer() {
  if (youtubePlayer || !window.YT || !window.YT.Player) return;

  youtubePlayer = new window.YT.Player("youtubePlayer", {
    height: "1",
    width: "1",
    videoId: CONFIG.youtubeVideoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: CONFIG.youtubeVideoId,
      playsinline: 1,
      rel: 0,
      modestbranding: 1
    },
    events: {
      onReady: (event) => {
        youtubeReady = true;
        youtubeFallback = false;
        try {
          event.target.setVolume(55);
        } catch (error) {
          // Some browsers restrict volume changes until playback begins.
        }

        if (musicRequested) {
          try {
            event.target.playVideo();
            updateMusicUI("loading");
          } catch (error) {
            updateMusicUI("paused");
          }
        } else {
          updateMusicUI("paused");
        }
      },
      onStateChange: (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
          updateMusicUI("playing");
        } else if (
          event.data === window.YT.PlayerState.PAUSED ||
          event.data === window.YT.PlayerState.ENDED
        ) {
          updateMusicUI("paused");
        } else if (event.data === window.YT.PlayerState.BUFFERING) {
          updateMusicUI("loading");
        }
      },
      onError: () => {
        youtubeReady = false;
        youtubeFallback = true;
        updateMusicUI("fallback");
        if (musicRequested) {
          showToast("Our song could not load here. Tap YouTube ↗ to listen.");
        }
      }
    }
  });
}

window.onYouTubeIframeAPIReady = initYouTubePlayer;

if (window.YT && window.YT.Player) {
  initYouTubePlayer();
}

window.setTimeout(() => {
  if (!youtubeReady) {
    youtubeFallback = true;
    updateMusicUI("fallback");
  }
}, 8000);

function toggleMusic() {
  if (youtubeFallback && !youtubeReady) {
    showToast("Opening our song on YouTube…");
    window.open(songUrl, "_blank", "noopener,noreferrer");
    return;
  }

  musicRequested = !musicRequested;

  if (musicRequested) {
    if (youtubeReady && youtubePlayer) {
      try {
        youtubePlayer.playVideo();
        updateMusicUI("loading");
      } catch (error) {
        showToast("Tap play once more, or open our song on YouTube.");
      }
    } else {
      updateMusicUI("loading");
      showToast("Loading our song…");
    }
  } else {
    if (youtubeReady && youtubePlayer) {
      try {
        youtubePlayer.pauseVideo();
      } catch (error) {
        // Nothing to pause yet.
      }
    }
    updateMusicUI("paused");
  }
}

musicButtons.forEach((button) => {
  button.addEventListener("click", toggleMusic);
});

/* -----------------------------
   Footer year
   ----------------------------- */

const currentYearEl = $("#currentYear");
if (currentYearEl) currentYearEl.textContent = String(new Date().getFullYear());

/* -----------------------------
   Small final touches
   ----------------------------- */

// Add a soft heart burst when the finale button is pressed.
const finaleButton = $(".finale__button");
if (finaleButton) {
  finaleButton.addEventListener("click", (event) => {
    burstHearts(event.clientX, event.clientY, 14);
  });
}

// Close the mobile menu when the viewport becomes large again.
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});
