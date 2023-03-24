"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDesc = exports.updateAvatar = exports.getUserById = void 0;
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const responseUtils_1 = require("../utils/responseUtils");
const imageUtils_1 = require("../utils/imageUtils");
const User_1 = __importDefault(require("../models/User"));
const getUserById = async (req, res) => {
    try {
        const user = await UserInfo_1.default.find({ userId: req.params.id }).populate('userId', ['email', 'avatar']);
        (0, responseUtils_1.createResponse)(res, 200, true, 'Get user successfully', user[0]);
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getUserById = getUserById;
const updateAvatar = async (req, res) => {
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    try {
        // const results = await Promise.all(files.map(uploadImage));
        const results = await Promise.all(files.map((file) => (0, imageUtils_1.uploadImage)(req.userId, file)));
        if (!results) {
            return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
        }
        console.log('log id: ', req.userId);
        const userUpdated = await User_1.default.findByIdAndUpdate(req.userId, {
            avatar: results[0],
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Update avatar successfully',
            userUpdated,
        });
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.updateAvatar = updateAvatar;
const updateDesc = async (req, res) => {
    try {
        const { desc } = req.body;
        console.log("desc   ", desc);
        console.log('log id: ', req.userId);
        const userUpdated = await UserInfo_1.default.findOneAndUpdate({ userId: req.userId }, {
            desc: desc,
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Update desc successfully',
            userUpdated,
        });
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.updateDesc = updateDesc;
//# sourceMappingURL=userController.js.map