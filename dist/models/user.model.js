"use strict";
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
exports.UserModel = void 0;
var database_1 = __importDefault(require("../database"));
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS;
function hashingPassword(password) {
    var salt = parseInt(SALT_ROUNDS, 10);
    return bcrypt_1.default.hashSync("".concat(password).concat(BCRYPT_PASSWORD), salt);
}
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Cannot get Users ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT id, firstname, lastname FROM users WHERE id = ($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Cannot get The User with id = ".concat(id, " ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING id, firstname, lastname';
                        return [4 /*yield*/, connection.query(sql, [
                                user.firstname,
                                user.lastname,
                                hashingPassword(user.password)
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Cannot create User ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "\n        DELETE FROM users WHERE id = ($1);\n      ";
                        // const alterSequenceQuery = ''
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        // const alterSequenceQuery = ''
                        _a.sent();
                        connection.release();
                        return [2 /*return*/, "DELETED User With id = ".concat(id, " Successfully")];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("\n      Unable to Delete User with id =  ".concat(id, ": ").concat(err_4.message, "\n      "));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "\n        UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4\n        RETURNING id, firstname, lastname\n      ";
                        return [4 /*yield*/, connection.query(sql, [
                                user.firstname,
                                user.lastname,
                                hashingPassword(user.password),
                                user.id
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Unable to Update user with The id = '".concat(user.id, "'"));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.authenticate = function (firstname, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, hashedPassword, isPasswordRight, userInfo, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT password FROM users WHERE firstname = $1";
                        return [4 /*yield*/, connection.query(sql, [firstname])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        hashedPassword = result.rows[0].password;
                        isPasswordRight = bcrypt_1.default.compareSync("".concat(password).concat(process.env.BCRYPT_PASSWORD), hashedPassword);
                        if (!isPasswordRight) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection.query("SELECT id, firstname, lastname FROM users WHERE firstname = $1", [firstname])];
                    case 3:
                        userInfo = _a.sent();
                        return [2 /*return*/, userInfo.rows[0]];
                    case 4:
                        connection.release();
                        return [2 /*return*/, null];
                    case 5:
                        err_6 = _a.sent();
                        throw new Error("Cannot Authenticate user: ".concat(err_6.message));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
