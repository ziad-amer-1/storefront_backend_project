# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### Order Prodcuts

- Junction table for order and product that contains the order id and product id

## Data Shapes

#### Product

- id -> number
- name -> string
- price -> number
- [OPTIONAL] category

#### User

- id -> number
- firstName -> string
- lastName -> string
- password -> string

#### Orders

- id -> number
- id of each product in the order -> number
- quantity of each product in the order -> number
- user_id -> number
- status of order (active or complete) -> string 'active' | 'completed'

#### Order Products

- id -> number
- order_id -> number
- product_id -> number
- quantity_of_each_product -> number

---

### Installation

- bcrypt -> for hashing my password
- db-migrate -> to deal with database schema
- express
- jsonwebtoken (JWT) -> to make a token to make the user authorized with
- jasmine -> to test my models which interact with database
- supertest -> to test my routes endpoint
- eslint and prettier -> to format my code
- typescript -> to make use of its type because this language is strongly typed language to prevent some error that javascript alone didn't handle

### Routes

#### User Route

- GET http://localhost:3000/users -> to get all Users
- GET http://localhost:3000/users/1 -> to get single User by id for example user with id = 1
- POST http://localhost:3000/users -> to Create a User
- PATCH http://localhost:3000/users -> to update a single User and you should make sure that you write the user id in th request body
- DELETE http://localhost:3000/users/1 -> to delete single User by id for example user with id = 1
- POST http://localhost:3000/users/authenticate -> to authenticate with the user and token make sure to path the correct token that you will recieve after creating a user and to pass the correct firstname and password

#### Order Route

- GET http://localhost:3000/orders -> to get all Orders
- GET http://localhost:3000/orders/1 -> to get single Order by id for example Order with id = 1
- POST http://localhost:3000/orders -> to Create an Order
- PATCH http://localhost:3000/orders -> to update a single Order and you should make sure that you write the order id in th request body
- DELETE http://localhost:3000/orders/1 -> to delete single Order by id for example order with id = 1

#### Product Route

- GET http://localhost:3000/products -> to get all Products
- GET http://localhost:3000/products/1 -> to get single Product by id for example Product with id = 1
- POST http://localhost:3000/products -> to Create an Product
- PATCH http://localhost:3000/products -> to update a single Product and you should make sure that you write the product id in th request body
- DELETE http://localhost:3000/products/1 -> to delete single Product by id for example product with id = 1

---
