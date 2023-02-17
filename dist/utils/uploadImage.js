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
exports.uploadImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID_S3,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
    region: process.env.REGION_s3,
});
const s3 = new aws_sdk_1.default.S3({ region: process.env.REGION_s3 });
function uploadImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileContents = Buffer.from(file.data);
        const params = {
            Bucket: process.env.BUCKET_s3,
            Key: file.name,
            Body: fileContents,
        };
        const result = yield s3.upload(params).promise();
        if (result.Location) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.uploadImage = uploadImage;
//# sourceMappingURL=uploadImage.js.map