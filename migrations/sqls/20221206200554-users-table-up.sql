CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  password TEXT NOT NULL
);
