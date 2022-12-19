CREATE TABLE order_products (
  id SERIAL  PRIMARY KEY,
  order_id int REFERENCES order (id) ON UPDATE CASCADE ON DELETE CASCADE,
  product_id int REFERENCES product (id) ON UPDATE CASCADE,
  quantity_of_each_product int NOT NULL
);