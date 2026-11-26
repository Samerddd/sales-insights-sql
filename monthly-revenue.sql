WITH paid_orders AS (
  SELECT id, customer, substr(placed_on, 1, 7) AS month
  FROM orders
  WHERE status = 'paid' AND placed_on >= ? AND placed_on < ?
),
order_totals AS (
  SELECT paid_orders.id, customer, month, SUM(quantity * unit_cents) AS revenue_cents
  FROM paid_orders JOIN order_items ON order_items.order_id = paid_orders.id
  GROUP BY paid_orders.id, customer, month
)
SELECT month,
       COUNT(*) AS paid_orders,
       COUNT(DISTINCT customer) AS customers,
       SUM(revenue_cents) AS revenue_cents
FROM order_totals
GROUP BY month
ORDER BY month;
