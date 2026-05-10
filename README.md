# Surajkumar20.github.io

Personal portfolio site for **Suraj Kumar Raja Ratnam** — mechanical engineer
working in robotics, BCI, wearables, and firmware.

The site is plain HTML, CSS, and a tiny bit of vanilla JavaScript. There is
no build step.

## Layout

```
index.html       Single-page portfolio
css/styles.css   Styles (dark + light, responsive)
js/main.js       Mobile nav toggle + footer year
images/          Photos used by the site
legacy/          Original HTML5 UP "Forty" template (kept for reference)
old_website/     Older website (kept for reference)
```

## Viewing the site

### Option 1 — open the file directly
Double-click `index.html`. It will open in your default browser. Everything
works except for cases where the browser blocks `file://` requests; those
are minor for this site.

### Option 2 — run a local server (recommended)

Pick whichever you have installed:

```powershell
# Python 3 (usually available)
python -m http.server 8000

# Node.js (one-liner, no install)
npx serve .

# PowerShell, no extra tools — uses .NET
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()
# (then point your browser at http://localhost:8000)
```

Then open <http://localhost:8000> in your browser.

### Option 3 — VS Code Live Server
Install the "Live Server" extension, right-click `index.html`, choose
**Open with Live Server**. The page reloads on save.

## Deploying to GitHub Pages

The repo name is `Surajkumar20.github.io`, so GitHub Pages serves
`index.html` from the repo root automatically:

1. Commit and push to `main`.
2. In the repo on GitHub: **Settings → Pages → Source: `main` / root**.
3. Wait ~1 minute, then visit <https://surajkumar20.github.io>.

## Editing content

All copy lives in `index.html`. The visual sections (hero, about,
experience, projects, skills, contact) are clearly commented and easy to
edit by hand.
