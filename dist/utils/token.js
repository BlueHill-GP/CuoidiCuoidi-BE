"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
dotenv.config();
const generateToken = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '12m',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '2h',
    });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
const updateRefreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield RefreshToken_1.default.findOne({ userId: userId });
        if (user) {
            yield RefreshToken_1.default.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken,
            });
        }
        else {
            yield RefreshToken_1.default.create({
                userId: userId,
                refreshToken: refreshToken,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateRefreshToken = updateRefreshToken;
//# sourceMappingURL=token.js.map