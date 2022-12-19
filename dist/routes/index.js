"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_route_1 = __importDefault(require("./api/users.route"));
var products_route_1 = __importDefault(require("./api/products.route"));
var orders_route_1 = __importDefault(require("./api/orders.route"));
var order_products_routre_1 = __importDefault(require("./api/order_products.routre"));
var routes = express_1.default.Router();
routes.use('/users', users_route_1.default);
routes.use('/products', products_route_1.default);
routes.use('/orders', orders_route_1.default);
routes.use('/order_products', order_products_routre_1.default);
exports.default = routes;
