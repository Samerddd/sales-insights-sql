CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer TEXT NOT NULL,
  placed_on TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'cancelled', 'refunded'))
) STRICT;

CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  sku TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_cents INTEGER NOT NULL CHECK (unit_cents >= 0),
  PRIMARY KEY (order_id, sku)
) STRICT;

CREATE INDEX orders_report_date ON orders(placed_on) WHERE status = 'paid';
