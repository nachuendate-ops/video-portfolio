# Your Name — Video Editor Portfolio

A clean, dark, minimal portfolio site for a video editor. Plain HTML, CSS
and JavaScript — no frameworks, no build step, no backend. Videos are
hosted on YouTube and embedded when a visitor clicks play.

Full beginner walkthrough (VS Code → GitHub → Vercel) is in the chat
message this project came with. This file is a quick-reference copy of
the same information.

## Folder structure

```
video-portfolio/
├── index.html          The entire page: hero, services, work, about, contact
├── css/
│   └── style.css       All styling, colors, spacing, animations
├── js/
│   ├── videos-data.js  EDIT THIS to add/change your YouTube videos
│   └── main.js         Site behavior (menu, animations, video embeds)
├── images/
│   ├── profile.jpg      Your photo goes here (add it yourself)
│   └── README.txt
├── .gitignore
└── README.md
```

## Run it locally

No installation required. Either:

- Double-click `index.html` to open it in your browser, or
- In VS Code, install the "Live Server" extension, right-click
  `index.html`, and choose **Open with Live Server** (recommended —
  auto-refreshes as you edit).

## Add your videos

Open `js/videos-data.js` and edit the list. Each project needs a
YouTube video ID (the part of the URL after `v=` or after `youtu.be/`),
a title, a category, and a duration. Full instructions are in comments
at the top of that file.

The big "showreel" video at the top of the Work section is set
separately, directly in `index.html` — search for `YOUTUBE_VIDEO_ID_SHOWREEL`.

## Deploy

Push this folder to a GitHub repository, then import it on
[vercel.com](https://vercel.com). Framework preset: **Other**. No
build command, no output directory needed — Vercel serves the static
files as-is.

## License

This is your project — do whatever you'd like with it.
