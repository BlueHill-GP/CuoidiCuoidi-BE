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
exports.deleteImage = exports.uploadImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const client_s3_1 = require("@aws-sdk/client-s3");
// import { s3Client } from "./libs/s3Client.js" // Helper function that creates Amazon S3 service client module.
const client_s3_2 = require("@aws-sdk/client-s3");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
aws_sdk_1.default.config.update({
    // try to use the latest version but not work :((
    accessKeyId: process.env.ACCESS_KEY_ID_S3,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
    region: process.env.REGION_s3,
});
const s3Client = new client_s3_2.S3Client({
    region: process.env.REGION_s3,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID_S3,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
    },
});
const s3 = new aws_sdk_1.default.S3({ region: process.env.REGION_s3 });
const uploadImage = (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContents = Buffer.from(file.data);
    const key = userId + file.name;
    const params = {
        Bucket: process.env.BUCKET_s3,
        Key: key,
        Body: fileContents,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };
    const result = yield s3.upload(params).promise();
    if (result.Location) {
        return process.env.LINK_BUCKET_S3 + key;
    }
    else {
        return false;
    }
});
exports.uploadImage = uploadImage;
// const uploadImage = async (file: UploadedFile, key: string) => {
//   const fileContents = Buffer.from(file.data as ArrayBuffer);
//   const fileStream = fs.createReadStream(file);
//   console.log("filename:      ",fileContents);
//   console.log('filename:      ', file.name);
//   try {
//     const data = await s3Client.send(
//       new PutObjectCommand({
//         Bucket: 'cuoidicuoidi-store',
//         Key: key,
//         Body: file.name,
//         ContentType: file.mimetype,
//         ACL: 'public-read',
//       })
//     );
//     console.log(data);
//     return process.env.LINK_S3 + key;
//   } catch (err) {
//     console.log('Error', err);
//     throw err;
//   }
// };
const deleteImage = (urlImage) => __awaiter(void 0, void 0, void 0, function* () {
    const key = urlImage.replace(process.env.LINK_S3, '');
    console.log(key);
    const bucketParams = {
        Bucket: 'cuoidicuoidi-store',
        Key: key,
    };
    try {
        const data = yield s3Client.send(new client_s3_1.DeleteObjectCommand(bucketParams));
        return data;
    }
    catch (err) {
        console.log('Error', err);
        return false;
    }
});
exports.deleteImage = deleteImage;
//# sourceMappingURL=handleImage.js.map