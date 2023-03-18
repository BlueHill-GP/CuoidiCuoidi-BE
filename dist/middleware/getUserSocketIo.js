"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketPartnerId = void 0;
const responseUtils_1 = require("../utils/responseUtils");
const UserSocketRepository_1 = __importDefault(require("../repositories/UserSocketRepository"));
const getSocketPartnerId = async (req, res, next) => {
    console.log(req.body);
    const { userId, partnerId, socketId } = req.body;
    console.log(userId, partnerId, socketId);
    try {
        let socketPartner;
        socketPartner = await new Promise((resolve, reject) => {
            UserSocketRepository_1.default.get(partnerId, (error, reply) => {
                if (error) {
                    reject(error);
                    console.log('qweqwe12123', error);
                }
                else {
                    console.log("qweqwe12123", reply);
                    resolve(reply);
                }
            });
        });
        console.log('socketPartner:', socketPartner);
        req.socketId = socketPartner;
        next();
    }
    catch (error) {
        console.log(error);
        return (0, responseUtils_1.createResponse)(res, 500, false, 'Internal Server Error');
    }
};
exports.getSocketPartnerId = getSocketPartnerId;
//# sourceMappingURL=getUserSocketIo.js.map