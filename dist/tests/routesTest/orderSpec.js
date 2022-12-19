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
var supertest_1 = __importDefault(require("supertest"));
var database_1 = __importDefault(require("../../database"));
var order_model_1 = require("../../models/order.model");
var user_model_1 = require("../../models/user.model");
var index_1 = __importDefault(require("../../index"));
var orderModel = new order_model_1.OrderModel();
var userModel = new user_model_1.UserModel();
var request = (0, supertest_1.default)(index_1.default);
describe('Test Order API Endpoints', function () {
    var user = {
        id: 1,
        firstname: 'ziad',
        lastname: 'amer',
        password: 'ziad123'
    };
    var order = {
        id: 1,
        user_id: 1,
        status: 'active'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    order.id = createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test CRUD methods', function () {
        it('should return 200 CREATED status code', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, status, user_id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/orders')
                            .set('Content-Type', 'application/json')
                            .send(order)];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data, id = _a.id, status = _a.status, user_id = _a.user_id;
                        expect(id).toBe(1);
                        expect(res.status).toBe(200);
                        expect(user_id).toBe(1);
                        expect(status).toBe('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 200 to get all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/api/orders').send()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.data.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 200 to get a single order by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, status, user_id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request.get("/api/orders/".concat(order.id)).send()];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data, id = _a.id, status = _a.status, user_id = _a.user_id;
                        expect(id).toBe(1);
                        expect(res.status).toBe(200);
                        expect(user_id).toBe(1);
                        expect(status).toBe('active');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 200 to update a order and give us a new order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, status, user_id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, request
                            .patch("/api/orders")
                            .set('Content-Type', 'application/json')
                            .send(__assign(__assign({}, order), { quantity_of_each_product: 5, status: 'complete' }))];
                    case 1:
                        res = _b.sent();
                        _a = res.body.data, id = _a.id, status = _a.status, user_id = _a.user_id;
                        expect(res.status).toBe(200);
                        expect(id).toBe(order.id);
                        expect(status).toBe('complete');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 200 to delete a order by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.delete("/api/orders/".concat(order.id)).send()];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = "\n        DELETE FROM orders;\n\n        ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n\n        DELETE FROM users;\n\n        ALTER SEQUENCE users_id_seq RESTART WITH 1;\n      ";
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
