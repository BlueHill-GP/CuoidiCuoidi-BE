"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPackageService = void 0;
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const responseUtils_1 = require("../utils/responseUtils");
const mongodb_1 = require("mongodb");
const verifyPackageService = async (req, res, next) => {
    try {
        const { serviceId } = req.body;
        console.log(serviceId);
        if (!mongodb_1.ObjectId.isValid(serviceId)) {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'Package service not found 1');
        }
        const servicePackage = await servicePackage_1.default.findById(serviceId);
        if (servicePackage) {
            console.log('owner ', servicePackage.user);
            let owenService = servicePackage.user;
            req.body.owenService = owenService;
            console.log("boody:", req.body);
            next();
        }
        else {
            return (0, responseUtils_1.createResponse)(res, 404, false, 'Package service not found');
        }
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.verifyPackageService = verifyPackageService;
//# sourceMappingURL=servicePackage.js.map