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
exports.getServicePackages = exports.deleteServicePackage = exports.updateServicePackage = exports.createServicePackage = void 0;
const response_1 = require("../utils/response");
const handleImage_1 = require("../utils/handleImage");
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const getServicePackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicePackages = yield servicePackage_1.default.find({
            user: req.userId,
        }).populate('user', ['username']);
        (0, response_1.createResponse)(res, 200, true, 'Get service packages successfully', servicePackages);
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.getServicePackages = getServicePackages;
const deleteServicePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        const servicePackage = yield servicePackage_1.default.findById({
            _id: req.params.id,
        });
        yield Promise.all(servicePackage.image.map((file) => (0, handleImage_1.deleteImage)(file)));
        const deletedPost = yield servicePackage_1.default.findOneAndDelete(postUpdateCondition);
        if (!deletedPost) {
            return (0, response_1.createResponse)(res, 500, false, 'User is not authorized or package service is not found');
        }
        (0, response_1.createResponse)(res, 200, true, 'Service package successfully deleted');
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.deleteServicePackage = deleteServicePackage;
const updateServicePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, image } = req.body;
    if (!description || !image) {
        return res
            .status(400)
            .json({ success: false, message: 'description is required' });
    }
    try {
        let updatePost = {
            description: description,
            image: image,
        };
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        updatePost = yield servicePackage_1.default.findOneAndUpdate(postUpdateCondition, updatePost, {
            new: true,
        });
        if (!updatePost) {
            return (0, response_1.createResponse)(res, 401, false, 'User is not authorized or package service is not found');
        }
        (0, response_1.createResponse)(res, 200, true, 'Service package successfully updated', updatePost);
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.updateServicePackage = updateServicePackage;
const createServicePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price } = req.body;
    const userIP = req.socket.remoteAddress;
    console.log("userIb: 34234: ", userIP);
    const files = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
    try {
        const results = yield Promise.all(files.map((file) => (0, handleImage_1.uploadImage)(req.userId, file)));
        if (!results) {
            return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
        }
        console.log('log id: ', req.userId);
        const newServicePackage = new servicePackage_1.default({
            title: title,
            description: description,
            price: price,
            image: results,
            user: req.userId,
        });
        yield newServicePackage.save();
        return res.status(200).json({
            success: true,
            message: 'Post created successfully',
            newServicePackage,
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.createServicePackage = createServicePackage;
//# sourceMappingURL=servicePackageController.js.map