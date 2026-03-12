```
🚧 -------- IN PLANNING — STARTING SOON -------- 🚧
```
<div align="center">

# TechTrendly
### *Real-time trends for jobs, languages, domains & technologies*

[![Made with FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Frontend Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql)](https://postgresql.org/)
[![Cache Redis](https://img.shields.io/badge/Cache-Redis-DC382D?style=flat-square&logo=redis)](https://redis.io/)
[![Deploy Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

<br/>

> Like Stack Overflow Trends — but for everything.  
> Track what's hot in the job market, what languages are rising, which domains are exploding, and what tech is getting left behind.

<br/>

![TechPulse Banner](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)

</div>

---

## 📸 What It Does

TechPulse aggregates data from **job boards, GitHub, Stack Overflow surveys, and developer communities** to surface real-time and historical trends across:

| Category | Examples |
|---|---|
| 🧑‍💻 **Jobs** | Backend Dev, ML Engineer, DevOps, Product Designer |
| 💻 **Languages** | Python, Rust, TypeScript, Go, Kotlin |
| 🌐 **Domains** | AI/ML, Web3, Cloud, Cybersecurity, Fintech |
| 🛠️ **Technologies** | React, Docker, LangChain, Terraform, FastAPI |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      DATA SOURCES                       │
│  LinkedIn · Indeed · GitHub API · SO Survey · Reddit   │
└────────────────────┬────────────────────────────────────┘
                     │  scrape / fetch
┌────────────────────▼────────────────────────────────────┐
│                BACKEND (Python / FastAPI)                │
│                                                         │
│   ┌─────────────┐    ┌──────────────┐                   │
│   │   Scrapers  │───▶│  Processor   │                   │
│   │ Scrapy/PW   │    │ NLP · Agg    │                   │
│   └─────────────┘    └──────┬───────┘                   │
│                             │                           │
│              ┌──────────────▼──────────────┐            │
│              │   PostgreSQL  +  Redis       │            │
│              │   Trends data   Cache        │            │
│              └──────────────┬──────────────┘            │
└─────────────────────────────│───────────────────────────┘
                              │  REST API
┌─────────────────────────────▼───────────────────────────┐
│                  FRONTEND (Next.js)                      │
│                                                         │
│   Trend Charts · Job Explorer · Language Rankings       │
│       Domain Heatmap · Search · Auth                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🧰 Tech Stack

### Backend
| Tool | Purpose |
|---|---|
| **Python 3.11+** | Core language |
| **FastAPI** | REST API framework |
| **Scrapy + Playwright** | Web scraping & JS-rendered pages |
| **spaCy** | NLP — skill extraction from job descriptions |
| **Celery + Redis** | Scheduled background scraping jobs |
| **PostgreSQL** | Primary database |
| **SQLAlchemy** | ORM |
| **Alembic** | DB migrations |

### Frontend
| Tool | Purpose |
|---|---|
| **Next.js 14** | React framework with SSR |
| **Tailwind CSS** | Styling |
| **Recharts / D3.js** | Trend visualizations |
| **NextAuth.js** | Authentication |
| **Meilisearch** | Fast in-app search |
| **SWR** | Data fetching & caching |

### Infrastructure
| Tool | Purpose |
|---|---|
| **Docker + Docker Compose** | Containerization |
| **Vercel** | Frontend deployment |
| **Railway / Render** | Backend + DB hosting |
| **GitHub Actions** | CI/CD pipeline |
| **Cron / Celery Beat** | Scheduled data refresh |

---

## 📁 Project Structure

```
TechTrendly/
├── backend/
│   ├── app/
│   │   ├── api/            # FastAPI route handlers
│   │   ├── scrapers/       # Scrapy spiders & Playwright scripts
│   │   ├── processors/     # NLP, aggregation logic
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── core/           # Config, DB connection, Redis
│   ├── celery_worker.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── app/                # Next.js app directory
│   │   ├── page.tsx        # Home — trending now
│   │   ├── languages/      # Language trends page
│   │   ├── jobs/           # Job market page
│   │   ├── domains/        # Domain trends page
│   │   └── compare/        # Side-by-side comparison
│   ├── components/
│   │   ├── charts/         # Recharts wrappers
│   │   ├── cards/          # Trend cards
│   │   └── ui/             # Shared UI components
│   └── lib/                # API client, helpers
│
├── docker-compose.yml
├── .github/workflows/      # CI/CD
└── README.md
```

---

## 🗄️ Database Schema

```sql
-- Core trend snapshot (aggregated counts per tag per day)
CREATE TABLE trends (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag         TEXT NOT NULL,          -- e.g. "python", "react"
  category    TEXT NOT NULL,          -- 'language' | 'job' | 'domain' | 'tech'
  count       INTEGER NOT NULL,
  source      TEXT,                   -- 'github' | 'indeed' | 'so_survey'
  region      TEXT DEFAULT 'global',
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Raw job postings
CREATE TABLE jobs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  company     TEXT,
  skills      TEXT[],                 -- extracted skill tags
  domain      TEXT,
  salary_min  INTEGER,
  salary_max  INTEGER,
  location    TEXT,
  remote      BOOLEAN DEFAULT FALSE,
  posted_at   TIMESTAMP,
  source_url  TEXT UNIQUE
);

-- Weekly rollups for historical charts
CREATE TABLE snapshots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start  DATE NOT NULL,
  tag         TEXT NOT NULL,
  category    TEXT NOT NULL,
  total_count INTEGER NOT NULL,
  rank        INTEGER
);
```

---

## 🔌 API Endpoints

```
GET /api/trends/languages     → top languages ranked by count
GET /api/trends/jobs          → trending job titles
GET /api/trends/domains       → rising domains (AI, Web3, etc.)
GET /api/trends/technologies  → hot frameworks & tools

GET /api/trends/history?tag=python&days=90   → historical chart data
GET /api/trends/compare?tags=rust,go,python  → multi-tag comparison

GET /api/jobs/search?q=ml+engineer&remote=true
GET /api/jobs/skills/top                     → top 20 in-demand skills
```

---

## 🗓️ Build Roadmap — Week by Week

### ✅ Week 1 — Data Foundation
> *Goal: Get real data flowing into a database*

- [ ] Set up PostgreSQL schema (`trends`, `jobs`, `snapshots`)
- [ ] Write scraper for **Indeed / LinkedIn** job postings (Playwright)
- [ ] Write **GitHub API** poller for language stats
- [ ] Download and parse **Stack Overflow Survey** CSV
- [ ] Build basic NLP pipeline to extract skills from job descriptions
- [ ] Verify data quality — dedup, normalize tag names
- [ ] Set up Docker Compose (Postgres + Redis + backend)

**Deliverable:** Populated DB with 1000+ job records and language counts

---

### ✅ Week 2 — Backend API
> *Goal: Expose clean, fast API endpoints*

- [ ] Build FastAPI app structure with SQLAlchemy
- [ ] Implement `/trends/languages`, `/trends/jobs`, `/trends/domains`
- [ ] Add Redis caching (TTL 1 hour for aggregate queries)
- [ ] Set up Celery Beat — daily scraping cron job
- [ ] Write `/trends/history` endpoint with date filtering
- [ ] Add basic rate limiting (slowapi)
- [ ] Write API tests with pytest

**Deliverable:** Working API returning real trend data, auto-refreshed daily

---

### ✅ Week 3 — Frontend
> *Goal: Build the UI — charts, rankings, search*

- [ ] Bootstrap Next.js 14 with Tailwind
- [ ] Build **Homepage** — "Trending Now" cards for each category
- [ ] Build **Languages page** — bar chart + ranked list with badges
- [ ] Build **Jobs page** — top titles, top skills, remote vs on-site split
- [ ] Build **Domains page** — heatmap or treemap of rising domains
- [ ] Add **Compare page** — multi-tag line chart (like Google Trends)
- [ ] Wire up SWR for data fetching with loading skeletons
- [ ] Add Meilisearch for tag/skill search

**Deliverable:** Fully functional UI connected to live API

---

### ✅ Week 4 — Polish & Deploy
> *Goal: Ship it, make it look great*

- [ ] Add NextAuth (GitHub login) + saved watchlist feature
- [ ] Mobile responsive pass — fix all breakpoints
- [ ] Add dark mode
- [ ] SEO — meta tags, OG images, sitemap
- [ ] Deploy frontend → **Vercel**
- [ ] Deploy backend + worker → **Railway** (or Fly.io)
- [ ] Set up GitHub Actions CI (lint → test → deploy on merge)
- [ ] Add error monitoring (Sentry)
- [ ] Performance audit — Lighthouse score > 90

**Deliverable:** Live production URL, CI/CD running, cron jobs active

---

## 🚀 Getting Started (Local Dev)

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose

### 1. Clone & setup

```bash
git clone https://github.com/yourusername/techpulse.git
cd techpulse
```

### 2. Start services

```bash
docker-compose up -d   # starts Postgres + Redis
```

### 3. Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start API
uvicorn app.main:app --reload --port 8000

# Start Celery worker (separate terminal)
celery -A celery_worker worker --loglevel=info
```

### 4. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # add your API URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)


<div align="center">
  <sub>Built with ❤️ to help developers stay ahead of the curve</sub>
</div>
