CREATE TYPE status_type AS ENUM('active', 'complete');

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  quantity_of_each_product INTEGER,
  user_id INTEGER REFERENCES users(id),
	 status status_type
);