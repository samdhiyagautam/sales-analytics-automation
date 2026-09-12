 Sales Analytics & Automation System

End-to-end e-commerce analytics pipeline** — from raw order data to an automated, decision-ready sales dashboard.

`PostgreSQL 18` `SQL` `Google Sheets` `Excel` `Apps Script` `GitHub Pages`

> Simulated e-commerce dataset · 3,000 orders · 2025

---

📌 Overview

This project demonstrates a full analytics workflow for a simulated e-commerce business — converting raw sales data into decision-ready insights using PostgreSQL/SQL for analysis, Excel/Google Sheets for dashboarding, and Google Apps Script for automated reporting.

 🎯 Business Problem

Management needed a single analytical view of sales performance: revenue and profitability, product and category performance, geographic performance, sales channels, customer segments, monthly trends, and operational losses from returns and cancellations.

🗂️ Dataset

3,000 simulated e-commerce order records with fields for order date, customer, location, segment, product, category, quantity, pricing, revenue, cost, profit, channel, payment method, and order status.

 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| PostgreSQL 18 / pgAdmin 4 | Database, table creation, SQL analysis |
| SQL | KPI, category, product, trend, geography, channel and segment analysis |
| Excel / Google Sheets | Analysis tables, KPIs and management dashboard |
| Google Apps Script | Automated KPI report and scheduled email workflow |
| GitHub + GitHub Pages | Portfolio code and live hosting |

📊 Executive KPIs

| Metric | Result |
|---|---|
| Total records | 3,000 |
| Delivered orders | 1,999 |
| Delivered units | 4,009 |
| Delivered revenue | ₹5,15,99,556 |
| Delivered profit | ₹1,66,17,503.48 |
| Profit margin | 32.20% |
| Average Order Value (AOV) | ₹25,812.68 |
| Return rate | 16.07% |
| Cancellation rate | 17.30% |

## 🔍 SQL Analysis Performed

- Data validation and order-status distribution
- Executive KPIs: orders, units, revenue, profit, margin
- Average Order Value overall and by customer segment
- Revenue, profit and margin by category
- Top products by revenue
- Product profitability and margin ranking
- Monthly revenue and profit trend
- Month-over-month revenue growth using the `LAG()` window function
- State-level performance
- Sales-channel performance
- Customer-segment performance
- Return and cancellation analysis

 💡 Key Business Insights

- **Electronics** is the largest revenue-driving category
- **Accessories** has the strongest category-level profit margin (~33.22%)
- **Laptop Pro 14** is the leading revenue-generating product
- **Website** is the strongest delivered-revenue sales channel
- **Uttar Pradesh** leads by delivered revenue among states
- **Small Business** customers have the highest AOV (₹28,189.86); **Consumer** has the highest order volume
- Returns + cancellations together account for **33.37%** of all orders — a key operational risk area
- April showed a strong rebound (**+34.75%** vs March), while May saw a sharp decline (**-22.82%** vs April)

## 📈 Dashboard

A management dashboard brings the analysis into a single view: KPI cards, category revenue, monthly revenue trend, sales-channel performance, customer-segment performance, top 10 products, and returned-vs-cancelled orders.

*(screenshot: `assets/dashboard.png`)*

 ⚙️ Automation Workflow

Google Apps Script reads the `Raw_Data` sheet → validates and calculates KPIs and top performers → refreshes an `Automation_Report` sheet → sends an HTML email report. A time-driven trigger runs this daily.

```
Raw sales data (Sheets) → Apps Script validates & calculates KPIs
  → Automation_Report refreshed → Daily HTML email report
  → Triggered automatically on a schedule
```

*(script: `automation/kpi_report.gs`)*

## ✅ Recommendations

1. Prioritise high-value Small Business customers with targeted bundles and higher-ticket offers
2. Protect Electronics' revenue leadership while testing margin-improvement in lower-margin categories/channels
3. Review Amazon channel economics — margin trails other major channels
4. Investigate return and cancellation drivers by product, location and channel
5. Use monthly trend monitoring as an early-warning signal for sharp performance swings

## 📁 Repository Structure

```
sales-analytics-automation/
├── README.md
├── dataset/
│   └── dataset.csv
├── sql/
│   └── sales_analytics.sql
├── automation/
│   └── kpi_report.gs
└── assets/
    ├── dashboard.png
    ├── sql_query_result.png
    └── automation_report.png

# Python Data Cleaning & Quality Automation

**Portfolio Project #02 — Gautam | Data Analyst**

A reproducible Python workflow that takes the portfolio's 3,000-row sales dataset, performs data-quality checks, standardizes fields, validates business rules, creates analysis-ready columns, and exports audit outputs.

## Dataset

The source dataset contains 3,000 sales/order records and 20 source columns covering order dates, customers, products, pricing, revenue, cost, profit, channels, payment methods and order status. The business statuses are Delivered, Returned and Cancelled. fileciteturn20file0L12-L16

The dataset is a **simulated e-commerce dataset for portfolio demonstration**.

## What the project demonstrates

- CSV ingestion and schema checks
- Text and datatype standardization
- Duplicate detection/removal
- Missing-value handling
- Date parsing
- Numeric validation
- Business-rule validation
- Derived analytical columns
- Anomaly flagging without overwriting valid business economics
- Automated quality and summary reports

## Run locally

```bash
pip install -r requirements.txt

python clean_data.py   --input data/sales_analytics_automation_dataset.csv   --output output
```

## Outputs

- `clean_sales_data.csv` — analysis-ready dataset
- `quality_report.csv` — data-quality checks
- `anomaly_report.csv` — rows requiring review
- `summary.json` — machine-readable project summary

## Business outcome

The workflow is designed as a reusable quality gate before SQL, Power BI or reporting work. It also keeps the source financial values intact and uses explicit flags when a business-rule review is needed.

## Suggested portfolio story

**Problem → Profile → Clean → Validate → Enrich → Audit → Ready for BI**


```

 🔗 Links

- **Dataset:** `dataset/dataset.csv`
- **SQL Queries:** `sql/sales_analytics.sql`
- **Live Dashboard/Report:** _add link once GitHub Pages is live_
