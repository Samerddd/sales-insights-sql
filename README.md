# Sales Insights SQL

A SQL reporting project that turns a synthetic order ledger into monthly revenue, paid order counts, and distinct customer counts. The SQLite schema, sample data, and reporting query are independent files.

## Run

Requires Node.js 24 or later. No packages to install.

~~~sh
node report.mjs 2026-01-01 2026-03-01
node --test
~~~

January returns three paid orders, two customers, and 9,500 cents in revenue. February returns one paid order, one customer, and 5,000 cents.

The query aggregates line items per order before counting orders. It excludes cancelled and refunded orders and binds date parameters. Date ranges include the start and exclude the end. Revenue is stored and reported as integer cents. Months with no qualifying line items are omitted.
