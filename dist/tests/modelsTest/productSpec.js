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
var product_model_1 = require("../../models/product.model");
var database_1 = __importDefault(require("../../database"));
var productModel = new product_model_1.ProductModel();
describe('Product Model Test', function () {
    describe('Test Method existence', function () {
        it('should have a method that returns all users', function () {
            expect(productModel.index).toBeDefined();
        });
        it('should have a method that returns a single user', function () {
            expect(productModel.show).toBeDefined();
        });
        it('should have a method that creates a user', function () {
            expect(productModel.create).toBeDefined();
        });
        it('should have a method that updates a user', function () {
            expect(productModel.update).toBeDefined();
        });
        it('should have a method that deletes a user', function () {
            expect(productModel.delete).toBeDefined();
        });
    });
    describe('Test product model Logic', function () {
        var product = {
            name: 'bag',
            price: 10
        };
        // before writing our logic i should make sure that my user is created
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create(product)];
                    case 1:
                        createdProduct = _a.sent();
                        product.id = createdProduct.id;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create product should resturn a new product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.create({
                            name: 'phone',
                            price: 100
                        })];
                    case 1:
                        createdProduct = _a.sent();
                        expect(createdProduct).toEqual({
                            id: createdProduct.id,
                            name: 'phone',
                            price: 100
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get All Products should return all available Products in database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.index()];
                    case 1:
                        products = _a.sent();
                        expect(products.length).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get Single Product with id should return a Product ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var singleProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.show(product.id)];
                    case 1:
                        singleProduct = _a.sent();
                        expect(singleProduct.id).toBe(product.id);
                        expect(singleProduct.name).toBe(product.name);
                        expect(singleProduct.price).toBe(product.price);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Update Product should return a product with new values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.update(__assign(__assign({}, product), { name: 'new phone', price: 200 }))];
                    case 1:
                        updatedProduct = _a.sent();
                        expect(updatedProduct.id).toBe(updatedProduct.id);
                        expect(updatedProduct.name).toBe('new phone');
                        expect(updatedProduct.price).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Delete method should delete Product from database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productModel.delete(product.id)];
                    case 1:
                        deletedUser = _a.sent();
                        expect(deletedUser).toBe("DELETED Product With id = ".concat(product.id, " Successfully"));
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
                        sql = "DELETE FROM product;\nALTER SEQUENCE product_id_seq RESTART WITH 1;";
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
