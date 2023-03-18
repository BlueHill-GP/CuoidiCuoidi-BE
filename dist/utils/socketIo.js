"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSocketId = void 0;
const UserSocketRepository_1 = __importDefault(require("../repositories/UserSocketRepository"));
const getUserSocketId = async (userId) => {
    let socketPartner;
    socketPartner = await new Promise((resolve, reject) => {
        UserSocketRepository_1.default.get(userId, (error, reply) => {
            if (error) {
                reject(error);
                console.log('user in not defined', error);
            }
            else {
                resolve(reply);
            }
        });
    });
    return socketPartner;
};
exports.getUserSocketId = getUserSocketId;
//# sourceMappingURL=socketIo.js.map