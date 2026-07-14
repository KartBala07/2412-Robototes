# Team 2412 Robototes — Website

A static website for **FRC Team 2412, the Robototes** (Sammamish High School, Bellevue, WA). Original design in the team's black/red branding — sharp edges, hard shadows, numbered sections, and custom SVG artwork.

Content (team history, robots, sponsors, outreach, advocacy, contact info) is adapted from [robototes.com](https://www.robototes.com) and public team records.

## Structure

```
pages/
  index.html                     Home — hero, stat bento grid, team band
  about/team_2412.html           Team history & mission
  about/first.html               What FIRST / FRC is
  robots/robototes_bots.html     Robot strip, 2008 → Phoenix (2026)
  sponsors.html                  2026 / 2025 / past sponsor walls
  outreach/overview.html         Community outreach programs
  resources/advocacy.html        STEM advocacy & the RSAA
  resources/documents.html       Links hub
  contact.html                   Emails, address, socials
  css/site.css                   Stylesheet (dark/light themes)
  js/site.js                     Theme toggle, mobile nav, reveals, counters
  pictures/site/2412_logo.png    Team logo
  pictures/art/*.svg             Custom illustrations (robot, team, outreach, advocacy, field)
```

## Deployment

Pushes to `main` deploy the `pages/` directory to GitHub Pages via `.github/workflows/static.yml` at https://kartbala07.github.io/2412-Robototes/.

## Swapping in real photos

The image slots currently use custom SVG illustrations (real photos weren't downloadable when the site was generated). To use a real photo, drop it in `pages/pictures/` and change the relevant `<img src="…/pictures/art/….svg">` to point at it — the frames (`.hero-art`, `.band`, `.cell-art`, `.bot img`) work with any image.
