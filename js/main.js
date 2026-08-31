/*
  ===========================================================
  MAIN SCRIPT
  This file is split into clearly labeled sections. Nothing
  here needs to change unless you want to adjust *behavior*
  (not content — for content, edit index.html and
  js/videos-data.js instead).
  ===========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScrollState();
  initMobileNav();
  initActiveNavLink();
  initScrubBar();
  initRevealOnScroll();
  initStatCounters();
  initProfilePhotoFallback();
  buildWorkGrid();
  initVideoPlayers();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------------------------------------------------------
   1. Header background appears once you scroll past the hero
--------------------------------------------------------- */
function initHeaderScrollState() {
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------
   2. Mobile hamburger menu open/close
--------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("mobileNav");

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   3. Highlight the nav link for the section currently in view
--------------------------------------------------------- */
function initActiveNavLink() {
  const sections = ["work", "services", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = document.querySelectorAll('[data-nav]');

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   4. Scroll "scrubber" progress bar + fake timecode readout
      (the signature motion element of this design)
--------------------------------------------------------- */
function initScrubBar() {
  const fill = document.getElementById("scrubFill");
  const playhead = document.getElementById("scrubPlayhead");
  const badge = document.getElementById("timecodeBadge");
  const TOTAL_SECONDS = 180; // treat the whole page as a 3:00 "video"

  const format = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    fill.style.width = `${percent * 100}%`;
    playhead.style.left = `${percent * 100}%`;

    if (badge) {
      badge.textContent = `${format(percent * TOTAL_SECONDS)} / ${format(TOTAL_SECONDS)}`;
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

/* ---------------------------------------------------------
   5. Fade-up reveal animations as elements enter the viewport
--------------------------------------------------------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   6. Animated number counters in the stats section
--------------------------------------------------------- */
function initStatCounters() {
  const numbers = document.querySelectorAll(".stat-number");
  if (!numbers.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out for a natural "settling" feel
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  numbers.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   7. If images/profile.jpg is missing, show a friendly
      placeholder instead of a broken image icon
--------------------------------------------------------- */
function initProfilePhotoFallback() {
  const img = document.getElementById("profilePhoto");
  const fallback = document.getElementById("profileFallback");
  if (!img || !fallback) return;

  img.addEventListener("error", () => {
    img.hidden = true;
    fallback.hidden = false;
  });
}

/* ---------------------------------------------------------
   8. Build the "Featured work" grid from js/videos-data.js
--------------------------------------------------------- */
function buildWorkGrid() {
  const grid = document.getElementById("workGrid");
  if (!grid || typeof videosData === "undefined") return;

  videosData.forEach((video, index) => {
    const card = document.createElement("article");
    card.className = "work-card reveal";
    card.style.setProperty("--delay", `${(index % 3) * 90}ms`);

    card.innerHTML = `
      <div class="video-frame" data-video-id="${video.id}" data-video-title="${video.title}">
        <img class="video-thumb" alt="" loading="lazy" />
        <button class="play-btn" aria-label="Play ${video.title}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7Z"/></svg>
        </button>
      </div>
      <div class="work-card-body">
        <span>
          <span class="work-card-title">${video.title}</span>
          <span class="work-card-category">${video.category}</span>
        </span>
        <span class="work-card-duration">${video.duration || ""}</span>
      </div>
    `;

    grid.appendChild(card);
  });

  // Newly created .reveal elements need to be observed too
  initRevealOnScroll();
}

/* ---------------------------------------------------------
   9. YouTube video cards: show a thumbnail first, and only
      load the real YouTube iframe once the user clicks play.
      This keeps the page fast (no heavy embeds load upfront).
--------------------------------------------------------- */
function initVideoPlayers() {
  const frames = document.querySelectorAll(".video-frame");

  frames.forEach((frame) => {
    const videoId = frame.dataset.videoId;
    const title = frame.dataset.videoTitle || "Video";
    const thumb = frame.querySelector(".video-thumb");
    const playBtn = frame.querySelector(".play-btn");

    // Use YouTube's public thumbnail image — no API key required.
    if (thumb && videoId) {
      thumb.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      thumb.alt = title;
    }

    const play = () => {
      if (!videoId) return;
      frame.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
          title="${title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
    };

    playBtn?.addEventListener("click", play);
    frame.addEventListener("click", (e) => {
      if (e.target === frame || e.target === thumb) play();
    });
  });
}
