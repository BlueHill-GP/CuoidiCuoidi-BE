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
exports.verifyPackageService = void 0;
const servicePackage_1 = __importDefault(require("../models/servicePackage"));
const response_1 = require("../utils/response");
const verifyPackageService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceId } = req.body;
        const servicePackage = yield servicePackage_1.default.findById(serviceId);
        if (servicePackage) {
            next();
        }
        else {
            return (0, response_1.createResponse)(res, 404, false, 'Package service not found');
        }
    }
    catch (error) {
        console.log(error);
        return (0, response_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
});
exports.verifyPackageService = verifyPackageService;
//# sourceMappingURL=servicePackage.js.map