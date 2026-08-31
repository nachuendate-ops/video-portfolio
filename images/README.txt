Put your photo here and name it exactly:

    profile.jpg

That's it — the About section in index.html already looks for
images/profile.jpg. If the file isn't there, the site
automatically shows a placeholder icon instead of a broken
image, so nothing breaks in the meantime.

Tips:
- A square-ish or portrait photo works best (the site crops it
  to a 4:5 shape automatically).
- Keep the file under ~500KB if you can, so the page loads fast.
  Any free image compressor (e.g. squoosh.app) works well.
- You can use a .png or .jpeg instead — just update the file
  path in index.html:
      <img src="images/profile.jpg" ...>
  to match, e.g. images/profile.png.
