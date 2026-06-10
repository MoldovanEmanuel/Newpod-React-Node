# Newpod — Solar Energy Website

Live website for SC Newpod SRL, a solar energy installer based in Bistrița, Romania. Features a quote request system, photo gallery with lightbox, Google-style review flow, GDPR cookie consent, and a full admin panel.

---

## Stack

| Layer        | Technology |
|--------------|-----------|
| Frontend     | React 18, Vite, TypeScript, Tailwind CSS, Zustand, TanStack Query |
| Backend      | Node.js, Express, TypeScript |
| Database     | MongoDB 8 via Mongoose |
| Auth         | JWT (jsonwebtoken + bcryptjs), admin-only |
| Email        | Nodemailer (any SMTP — Gmail, Mailgun, etc.) |
| Rate Limiting | express-rate-limit (1 review per IP per 24h) |
| Testing      | Vitest (unit), Playwright (E2E) |
| Deploy       | Docker Compose — one command |

---

## Features

### Customer-facing
- **Quote form** — 15+ fields (system type, building type, roof orientation, pool, backup system, county), honeypot spam protection, email sent on submit
- **Services** — Thermal solar (ACM), photovoltaic (PV), Casa Verde subsidy program
- **Gallery** — 8-photo grid with keyboard-navigable lightbox (← → Esc), lazy loading
- **Partners** — European partners, lithium batteries, and inverter brands in three columns
- **Reviews** — live stats (average + count from MongoDB), featured hero review, paginated grid, animated star picker, 30-char minimum, moderated before publish
- **FAQ accordion** — 6 items, smooth max-height animation, Casa Verde info panel
- **Contact** — form + embedded Google Maps, address/phone/email/hours
- **Question form** — lightweight 3-field "ask us anything" section
- **Cookie banner** — GA4 loaded only after consent, preference persisted in `localStorage` via Zustand

### Admin panel (`/admin`)
| Section | What it does |
|---------|-------------|
| Setup | First-run account creation (username + password, bcrypt-hashed, stored in `server/data/admin.json`) |
| Login | JWT issued on success, stored in `localStorage` via Zustand, Bearer-authenticated on all admin routes |
| Pending reviews | Expand to edit display name, label, location, rating, text, owner reply; approve & publish or delete |
| Published reviews | Same edit form; one review can be marked Featured (shown as hero card) |

### Backend API
- **`GET /api/reviews`** — approved non-featured, newest first (no private fields)
- **`GET /api/reviews/featured`** — single featured review
- **`GET /api/reviews/stats`** — `{ count, avg }` from approved reviews
- **`POST /api/forms`** — handles `oferta`, `contact`, `intrebare` form types; validates, sanitizes, sends email
- **`POST /api/forms/review`** — rate-limited (1/IP/day); saves to MongoDB as `pending`
- **`GET /api/admin/status`** — `{ setup: boolean }` — tells the client whether first-run setup is needed
- **`POST /api/admin/setup`** — creates the admin account (only works once)
- **`POST /api/admin/login`** — returns JWT
- **`GET /api/admin/reviews`** — all reviews (protected)
- **`PUT /api/admin/reviews/:id`** — update any field; enforces single-featured constraint
- **`DELETE /api/admin/reviews/:id`** — permanent delete

---

## Project Structure

```
Newpod-React-Node/
├── .env.example
├── .gitignore
├── docker-compose.yml           # mongo + server + client (nginx)
├── playwright.config.ts
├── .github/
│   └── workflows/ci.yml         # typecheck → vitest → build → playwright
│
├── server/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts             # Express entry — MongoDB connect, routes mount
│       ├── models/
│       │   └── Review.ts        # Mongoose schema + IReview interface
│       ├── routes/
│       │   ├── forms.ts         # oferta / contact / intrebare / review (rate-limited)
│       │   ├── reviews.ts       # Public review endpoints
│       │   └── admin.ts         # Protected CRUD + setup/login
│       ├── middleware/
│       │   └── auth.ts          # requireAuth — Bearer JWT guard
│       └── utils/
│           ├── jwt.ts           # signToken / verifyToken
│           └── email.ts         # sendEmail, makeDisplayName, sanitize, isValidEmail
│
└── client/
    ├── Dockerfile               # Vite build → nginx
    ├── nginx.conf               # SPA fallback + /api proxy
    ├── index.html               # JSON-LD LocalBusiness, OG tags, GA4 placeholder
    ├── tailwind.config.ts       # Custom colors, fonts, animations
    ├── vite.config.ts           # Path alias @/, /api proxy to :3001
    └── src/
        ├── main.tsx             # QueryClient + BrowserRouter + StrictMode
        ├── App.tsx              # Routes: / /admin /politica /termeni *
        ├── types/index.ts       # Review, ReviewStats, QuoteFormData, …
        ├── store/index.ts       # Zustand: UIStore, CookieStore (persisted), AdminStore (persisted)
        ├── hooks/
        │   └── useReviews.ts    # TanStack Query: stats, approved, featured, admin CRUD mutations
        ├── styles/globals.css   # @font-face DM Sans + Tailwind directives + lightbox/popup/cookie CSS
        ├── components/
        │   ├── Navbar.tsx       # IntersectionObserver active links, mobile slide-out menu
        │   ├── Hero.tsx         # Responsive banner image with fetchPriority="high"
        │   ├── QuoteForm.tsx    # 15-field controlled form, POST /api/forms
        │   ├── Services.tsx     # 3 service cards (ACM, PV, Casa Verde)
        │   ├── Gallery.tsx      # Photo grid + Lightbox trigger
        │   ├── Lightbox.tsx     # Keyboard-navigable overlay (Zustand state)
        │   ├── Partners.tsx     # 3-column brand list
        │   ├── Reviews.tsx      # Stats header + featured card + grid
        │   ├── ReviewForm.tsx   # Star picker + controlled form + trust panel
        │   ├── StarPicker.tsx   # Interactive star rating + Stars display component
        │   ├── FAQ.tsx          # Accordion + Casa Verde info panel
        │   ├── Contact.tsx      # Form + Google Maps embed
        │   ├── QuestionForm.tsx # Lightweight question form
        │   ├── CookieBanner.tsx # GA4 conditional load, Zustand-persisted consent
        │   ├── Popup.tsx        # Auto-dismiss toast (success/error, 5s)
        │   └── Footer.tsx       # Nav links + copyright
        ├── pages/
        │   ├── Home.tsx         # All sections composed in order
        │   ├── Admin.tsx        # Auth form → Dashboard (setup / login / review CRUD)
        │   ├── PrivacyPolicy.tsx
        │   ├── TermsConditions.tsx
        │   └── NotFound.tsx     # 404 with back-home link
        └── test/
            ├── setup.ts         # @testing-library/jest-dom
            ├── StarPicker.test.tsx
            └── store.test.ts
```

---

## License

Private website — all rights reserved.
