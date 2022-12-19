"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_products_model_1 = require("../../models/order_products.model");
var product_model_1 = require("../../models/product.model");
var order_model_1 = require("../../models/order.model");
var user_model_1 = require("../../models/user.model");
var database_1 = __importDefault(require("../../database"));
var orderModel = new order_model_1.OrderModel();
var userModel = new user_model_1.UserModel();
var productModel = new product_model_1.ProductModel();
var orderProductsModel = new order_products_model_1.Order_products_model();
describe('Order Products Model Test', function () {
    describe('Test Method existence', function () {
        it('should have a method that returns all order products', function () {
            expect(orderProductsModel.index).toBeDefined();
        });
        it('should have a method that returns a single order product', function () {
            expect(orderProductsModel.show).toBeDefined();
        });
        it('should have a method that creates a order product', function () {
            expect(orderProductsModel.create).toBeDefined();
        });
        it('should have a method that updates a order product', function () {
            expect(orderProductsModel.update).toBeDefined();
        });
        it('should have a method that deletes a order product', function () {
            expect(orderProductsModel.delete).toBeDefined();
        });
    });
    describe('Test order products model Logic', function () {
        var order_products = {
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity_of_each_product: 1
        };
        var product = {
            id: 1,
            name: 'phone',
            price: 10
        };
        var order = {
            id: 1,
            user_id: 1,
            status: 'active'
        };
        var user = {
            id: 1,
            firstname: 'ziad',
            lastname: 'amer',
            password: 'ziad123'
        };
        // before writing our logic i should make sure that my user is created
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdUser, createdProduct, createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userModel.create(user)];
                    case 1:
                        createdUser = _a.sent();
                        return [4 /*yield*/, productModel.create(product)];
                    case 2:
                        createdProduct = _a.sent();
                        return [4 /*yield*/, orderModel.create(order)];
                    case 3:
                        createdOrder = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create order should resturn a new order products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrderProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderProductsModel.create(order_products)];
                    case 1:
                        createdOrderProducts = _a.sent();
                        expect(createdOrderProducts).toEqual({
                            id: 1,
                            order_id: 1,
                            product_id: 1,
                            quantity_of_each_product: 1
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get All Order products should return all available order products in database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdOrderProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderProductsModel.index()];
                    case 1:
                        createdOrderProducts = _a.sent();
                        expect(createdOrderProducts.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Single Order product with id should return a Order product ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var singleOrderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderProductsModel.show(order_products.id)];
                    case 1:
                        singleOrderProduct = _a.sent();
                        expect(singleOrderProduct.id).toBe(order_products.id);
                        expect(singleOrderProduct.order_id).toBe(order_products.order_id);
                        expect(singleOrderProduct.product_id).toBe(order_products.product_id);
                        expect(singleOrderProduct.quantity_of_each_product).toBe(order_products.quantity_of_each_product);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update Order product should return a order with new values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedOrderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderProductsModel.update(__assign(__assign({}, order_products), { order_id: 1, product_id: 1, quantity_of_each_product: 10 }))];
                    case 1:
                        updatedOrderProduct = _a.sent();
                        expect(updatedOrderProduct.id).toBe(order_products.id);
                        expect(updatedOrderProduct.order_id).toBe(1);
                        expect(updatedOrderProduct.product_id).toBe(1);
                        expect(updatedOrderProduct.quantity_of_each_product).toBe(10);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete method should delete Order Product from database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedOrderProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderProductsModel.delete(order.id)];
                    case 1:
                        deletedOrderProduct = _a.sent();
                        expect(deletedOrderProduct).toBe("DELETED order products With id = ".concat(order_products.id, " Successfully"));
                        return [2 /*return*/];
                }
            });
        }); });
        // after writing our logic i should make sure that my user is deleted
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "\n        DELETE FROM order_products;\n\n        ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n\n        DELETE FROM orders;\n\n        ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n\n        DELETE FROM product;\n\n        ALTER SEQUENCE product_id_seq RESTART WITH 1;\n\n        DELETE FROM users;\n\n        ALTER SEQUENCE users_id_seq RESTART WITH 1;\n      ";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
