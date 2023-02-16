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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshToken = exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const response_1 = require("../utils/response");
const token_1 = require("../utils/token");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validation
    const { username, password } = req.body;
    console.log(username, password);
    if (!username && !password) {
        return (0, response_1.createResponse)(res, 400, false, 'Missing username or password?');
    }
    try {
        //check if user already exists
        const user = yield User_1.default.findOne({ username });
        if (user) {
            return (0, response_1.createResponse)(res, 400, false, 'User already exists');
        }
        // start user registration
        const hashedPassword = yield argon2_1.default.hash(password);
        const newUser = new User_1.default({ username, password: hashedPassword });
        yield newUser.save();
        (0, response_1.createResponse)(res, 200, true, 'User registered successfully');
    }
    catch (err) {
        console.log(err);
        return (0, response_1.createResponse)(res, 500, false, 'Internal server error');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return (0, response_1.createResponse)(res, 400, false, 'Missing username or password?');
    }
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return (0, response_1.createResponse)(res, 404, false, 'Incorrect username or password?');
        }
        const isMatch = yield argon2_1.default.verify(user.password, password);
        if (!isMatch) {
            return (0, response_1.createResponse)(res, 400, false, 'Incorrect username or password?');
        }
        const token = (0, token_1.generateToken)(user._id);
        (0, token_1.updateRefreshToken)(user._id, token.refreshToken);
        (0, response_1.createResponse)(res, 200, true, 'Login successful', token);
    }
    catch (err) {
        console.log(err);
        return (0, response_1.createResponse)(res, 500, false, 'Internal server error');
    }
});
exports.login = login;
const getRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, refreshToken } = req.body;
    if (!userId || !refreshToken) {
        return (0, response_1.createResponse)(res, 400, false, 'Missing userId or refreshToken?');
    }
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const token = (0, token_1.generateToken)(userId);
        (0, token_1.updateRefreshToken)(userId, token.refreshToken);
        (0, response_1.createResponse)(res, 200, true, 'refreshToken successful', token);
    }
    catch (error) {
        console.log(error.name);
        if (error.name === 'TokenExpiredError') {
            const token = (0, token_1.generateToken)(userId);
            (0, token_1.updateRefreshToken)(userId, token.refreshToken);
            return (0, response_1.createResponse)(res, 200, true, 'refreshToken successful', token);
        }
        return (0, response_1.createResponse)(res, 500, false, 'Internal server error');
    }
});
exports.getRefreshToken = getRefreshToken;
//# sourceMappingURL=authController.js.map