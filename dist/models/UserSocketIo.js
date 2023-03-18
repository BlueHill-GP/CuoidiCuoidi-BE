"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSocketScheme = new mongoose_1.default.Schema({
    userSocketId: {
        type: String,
        required: true,
    }
});
const UserSocket = mongoose_1.default.model('userSockets', UserSocketScheme);
exports.default = UserSocket;
//# sourceMappingURL=UserSocketIo.js.map