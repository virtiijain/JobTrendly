# 📊 JobTrend Analyzer

> See which tech domains, languages, and skills are dominating the job market — year by year.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-yellow?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Pandas](https://img.shields.io/badge/Pandas-2.0-purple?style=for-the-badge&logo=pandas)

---

## 🧠 What is JobTrend Analyzer?

JobTrend Analyzer is a full-stack data analytics web application that tracks and visualizes job market trends across different tech domains, programming languages, and technologies. Think of it like **TIOBE Index** or **Stack Overflow Developer Survey** — but focused entirely on **real job demand**.

Users can explore:
- Which **job domains** are hiring the most (Data Science, Web Dev, DevOps, etc.)
- Which **technologies and languages** are rising or falling in demand
- **Salary insights** per domain and skill
- **Year-over-year growth** of any technology
- **Side-by-side comparison** of two technologies
- Upload and analyze **your own job data CSV**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📈 Domain Rankings | Top job domains ranked by % share of total postings |
| 📉 Technology Trends | Line chart showing rise/fall of each tech per year |
| 💰 Salary Insights | Average, min, max salary per domain and technology |
| 🔄 Year-over-Year Growth | % change in demand compared to previous year |
| ⚖️ Compare Technologies | Side-by-side comparison of any two technologies |
| 📂 Upload CSV | Upload your own job data and get instant analysis |
| 🔔 Alerts | Get notified when a technology spikes or drops significantly |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** — App Router, Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Styling
- **Recharts / Tremor** — Charts and data visualization

### Backend
- **Python 3.11** — Core language
- **FastAPI** — REST API framework
- **Supabase Python Client** — Database connection
- **Pandas + NumPy** — Data processing and analytics

### Database
- **Supabase** — PostgreSQL database with visual dashboard
- **Supabase Auth** — Built-in authentication

### DevOps & Deployment
- **Vercel** — Frontend deployment
- **Render** — Backend + Database deployment
- **Docker** — Local development (optional)
  
---

## 📊 Data Sources

| Source | Description | Format |
|--------|-------------|--------|
| Kaggle LinkedIn Jobs Dataset | 33,000+ job postings | CSV |
| Stack Overflow Developer Survey 2024 | Developer survey data | CSV |
| GitHub Jobs Archive | Historical job data | JSON/CSV |
| Custom Upload | Your own job data | CSV |

### Required CSV Columns
```
job_id, title, domain, technology, language,
experience_level, salary_min, salary_max,
country, company_size, year, month
```

---

> **JobTrend Analyzer** — Because knowing what the market wants is the most important skill of all.
