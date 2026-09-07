-- GAUTAM | DATA ANALYST PORTFOLIO
-- PROJECT: Sales Analytics & Automation System
-- PostgreSQL 18 | Simulated E-commerce Dataset | 3,000 orders

-- 01. DATA VALIDATION
SELECT COUNT(*) AS total_records
FROM sales_orders;

SELECT
    order_status,
    COUNT(*) AS total_orders,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS percentage
FROM sales_orders
GROUP BY order_status
ORDER BY total_orders DESC;

-- 02. EXECUTIVE KPIs
SELECT
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_units,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered';

-- 03. AVERAGE ORDER VALUE
SELECT
    ROUND(SUM(revenue) / COUNT(DISTINCT order_id), 2) AS average_order_value
FROM sales_orders
WHERE order_status = 'Delivered';

SELECT
    customer_segment,
    COUNT(DISTINCT order_id) AS total_orders,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(revenue) / COUNT(DISTINCT order_id), 2) AS average_order_value
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY customer_segment
ORDER BY average_order_value DESC;

-- 04. CATEGORY PERFORMANCE
SELECT
    category,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_units,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY category
ORDER BY total_revenue DESC;

-- 05. TOP PRODUCTS BY REVENUE
SELECT
    product_name,
    SUM(quantity) AS units_sold,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY product_name
ORDER BY total_revenue DESC
LIMIT 10;

-- 06. PRODUCT PROFITABILITY
SELECT
    product_name,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY product_name
ORDER BY profit_margin_pct DESC;

-- 07. MONTHLY SALES TREND
SELECT
    DATE_TRUNC('month', order_date)::date AS month,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_units,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY 1
ORDER BY 1;

-- 08. MONTH-OVER-MONTH GROWTH
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', order_date)::date AS month,
        SUM(revenue) AS revenue,
        SUM(profit) AS profit
    FROM sales_orders
    WHERE order_status = 'Delivered'
    GROUP BY 1
)
SELECT
    month,
    ROUND(revenue, 2) AS revenue,
    ROUND(profit, 2) AS profit,
    ROUND(
        100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month),0),
        2
    ) AS mom_growth_pct
FROM monthly_sales
ORDER BY month;

-- 09. STATE PERFORMANCE
SELECT
    state,
    COUNT(DISTINCT order_id) AS total_orders,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY state
ORDER BY total_revenue DESC;

-- 10. SALES CHANNEL PERFORMANCE
SELECT
    sales_channel,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_units,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY sales_channel
ORDER BY total_revenue DESC;

-- 11. CUSTOMER SEGMENT PERFORMANCE
SELECT
    customer_segment,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_units,
    ROUND(SUM(revenue), 2) AS total_revenue,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND(100.0 * SUM(profit) / NULLIF(SUM(revenue),0), 2) AS profit_margin_pct
FROM sales_orders
WHERE order_status = 'Delivered'
GROUP BY customer_segment
ORDER BY total_revenue DESC;

-- 12. RETURN & CANCELLATION ANALYSIS
SELECT
    COUNT(*) AS total_orders,
    SUM(CASE WHEN order_status = 'Returned' THEN 1 ELSE 0 END) AS returned_orders,
    SUM(CASE WHEN order_status = 'Cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
    ROUND(100.0 * SUM(CASE WHEN order_status = 'Returned' THEN 1 ELSE 0 END) / COUNT(*), 2) AS return_rate_pct,
    ROUND(100.0 * SUM(CASE WHEN order_status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct
FROM sales_orders;

-- PROJECT NOTE
-- This dataset is simulated for portfolio/interview practice.
-- Do not present it as real confidential company data.
