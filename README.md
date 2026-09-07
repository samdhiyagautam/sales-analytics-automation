# Sales Analytics & Automation System

An end-to-end portfolio project demonstrating practical Data Analyst skills across SQL, PostgreSQL, Excel/Google Sheets, dashboarding, and Google Apps Script automation.

## Business Problem

Management needs a single analytical view of sales performance across revenue, profit, products, categories, geography, sales channels, customer segments, monthly trends, returns, and cancellations.

## Tools

- PostgreSQL 18 / pgAdmin 4
- SQL
- Excel / Google Sheets
- Google Apps Script
- GitHub

## Dataset

This project uses a simulated e-commerce dataset containing 3,000 order records.

> This dataset is simulated for portfolio and interview practice and is not confidential or real company data.

## Executive KPIs

| Metric | Result |
|---|---:|
| Total Records | 3,000 |
| Delivered Orders | 1,999 |
| Delivered Units | 4,009 |
| Delivered Revenue | ₹5,15,99,556 |
| Delivered Profit | ₹1,66,17,503.48 |
| Profit Margin | 32.20% |
| Average Order Value | ₹25,812.68 |
| Return Rate | 16.07% |
| Cancellation Rate | 17.30% |

## SQL Analysis

- Data validation and order-status distribution
- Executive KPIs
- Average Order Value
- Category performance
- Top products by revenue
- Product profitability and margin
- Monthly revenue and profit trend
- Month-over-month growth using `LAG()`
- State performance
- Sales-channel performance
- Customer-segment performance
- Return and cancellation analysis

## Key Insights

- Electronics is the largest revenue-driving category.
- Accessories has the strongest category-level profit margin.
- Laptop Pro 14 is the leading revenue-generating product.
- Website is the strongest delivered-revenue sales channel.
- Uttar Pradesh is the leading state by delivered revenue in this dataset.
- Small Business customers have the highest AOV.
- Consumer customers have the highest delivered order volume.
- Returns and cancellations together represent 33.37% of all orders.
- Monthly sales show meaningful volatility, including a strong April rebound and a May decline.

## Dashboard

The dashboard includes:
- Executive KPI cards
- Revenue by category
- Monthly revenue trend
- Revenue by sales channel
- Revenue by customer segment
- Top 10 products by revenue
- Returned vs cancelled orders

## Automation

Google Apps Script reads the sales data from Google Sheets and:

1. Calculates core KPIs
2. Identifies top product, category and channel
3. Refreshes an `Automation_Report` sheet
4. Sends an automated HTML email report
5. Runs through a daily time-driven trigger

## Workflow

```text
Raw Sales Data
      ↓
PostgreSQL + SQL Analysis
      ↓
Excel / Google Sheets Analysis
      ↓
Management Dashboard
      ↓
Google Apps Script Automation
      ↓
Automated Daily Report
```


## Portfolio Links

- 📊 [View Live Dashboard](https://docs.google.com/spreadsheets/d/1LSBwi-Up503sTW-ACgDT7O3uTLTWZXlnKxnTLOVmsIA/edit?usp=sharing)
- 💻 [GitHub Profile](https://github.com/samdhiyagautam)
- 💼 [LinkedIn](https://www.linkedin.com/in/connectwithgautam)
- 🌐 [Live Portfolio](https://samdhiyagautam.github.io/gautam-data-analyst-portfolio/)

## Author

**Gautam**  
Aspiring Data Analyst  
Email: gautamsamdhiya2000@gmail.com
