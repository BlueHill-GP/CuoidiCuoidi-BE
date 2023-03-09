"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const responseUtils_1 = require("../utils/responseUtils");
const getUserById = async (req, res) => {
    try {
        const user = await UserInfo_1.default.find({ userId: req.params.id })
            .populate('userId', ['email']);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Get user successfully', user[0]);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=userController.js.map