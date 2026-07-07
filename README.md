# Mohamed Riyas B — Portfolio

A single-page portfolio (Home / About / Projects / Credentials / Achievements / Contact),
built with plain HTML/CSS/JS so it can be hosted for free with no build step.

## 1. Before you deploy — fill in the placeholders

Open `index.html` and search for `data-fill=` — every one of these is a link you need to
replace with your real URL. Clicking a placeholder link in the live site will pop up a
reminder telling you exactly which one to fix.

Placeholders to fill:
- `github-cybsecure`, `demo-cybsecure` — CybSecure repo + live demo links
- `github-editsync`, `demo-editsync` — EditSync repo + live demo links
- `cert-aws`, `cert-mongodb`, `cert-ibm`, `cert-coursera`, `cert-iot` — links to your certificate images/PDFs
- `github-profile`, `linkedin-profile`, `portfolio-alt` — your social/profile links

**To add certificate images/PDFs:**
1. Put your certificate files in `assets/certificates/` (e.g. `aws-cloud-practitioner.pdf`).
2. In `index.html`, set the matching `href` to `assets/certificates/your-file.pdf`.
3. Commit and push — GitHub Pages will serve the file directly.

## 2. Set up the contact form (Formspree — free, no backend needed)

1. Go to [formspree.io](https://formspree.io) and sign up free.
2. Create a new form, and set the destination email to `mhdriyasb@gmail.com`.
3. Formspree gives you a form endpoint like `https://formspree.io/f/abcd1234`.
4. In `index.html`, find:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your real ID.
5. Delete the red warning note (`<p class="form-note" ...>`) right below the submit button — it's only there to flag the placeholder.
6. Test it — submit the form once from your live site and confirm you receive the email (Formspree requires one confirmation on first use).

Free tier covers 50 submissions/month, which is plenty for a portfolio.

## 3. Deploy for free with GitHub Pages

1. Create a new GitHub repository, e.g. `riyas-portfolio`.
2. In this `portfolio` folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/MohamedRiyasB/Riyas-Portfolio.git
   git push -u origin main
   ```
3. On GitHub: go to the repo → **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. After a minute, your site will be live at:
   ```
   https://MohamedRiyasB.github.io/riyas-portfolio/
   ```

### Optional: custom domain
If you buy a domain later, add a `CNAME` file in this folder containing just your domain
(e.g. `riyasb.dev`), and point your domain's DNS to GitHub Pages per
[GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## 4. Local preview before pushing

Just open `index.html` directly in a browser, or run a local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## File structure
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── certificates/   ← put your cert PDFs/images here
│   └── img/            ← any other images (profile photo, project screenshots)
└── README.md
```

## Updating content later
All text lives directly in `index.html` — projects, certifications, and achievements are
each a repeated HTML block (`.project-card`, `.cert-card`, `.log-entry`). Copy an existing
block and edit the text to add a new entry.
