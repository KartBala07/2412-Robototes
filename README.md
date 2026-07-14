# Team 2412 Robototes — Website

A static website for **FRC Team 2412, the Robototes** (Sammamish High School, Bellevue, WA), built in the style of [limesite.org](https://github.com/kartbala07/limesite.org) and re-skinned to the Robototes' black/red branding.

Content (team history, robots, sponsors, outreach, advocacy, contact info) is adapted from [robototes.com](https://www.robototes.com) and public team records.

## Structure

```
pages/
  index.html                     Home — hero, marquee, stats, action panels, cards
  about/team_2412.html           Team history & mission
  about/first.html               What FIRST / FRC is
  robots/robototes_bots.html     Robot timeline, 2008 → Phoenix (2026)
  sponsors.html                  2026 / 2025 / past sponsors
  outreach/overview.html         Community outreach programs
  resources/advocacy.html        STEM advocacy & the RSAA
  resources/documents.html       Documents & links
  contact.html                   Emails, address, socials
  css/site.css                   Shared stylesheet (dark/light themes)
  js/site.js                     Shared behavior (theme, search, reveal, counters)
  pictures/site/2412_logo.png    Team logo
```

## Deployment

Pushes to `main` deploy the `pages/` directory to GitHub Pages via `.github/workflows/static.yml`.

## Adding photos

Team photos couldn't be downloaded when this site was generated, so photo slots use styled placeholder frames (`.ph-frame`). To drop in a real photo, replace the placeholder `<div class="ph-frame">…</div>` with:

```html
<img src="pictures/<your-photo>.jpg" alt="…">
```

inside the same wrapper (`.pano-frame` or `.card-img-wrap`).
