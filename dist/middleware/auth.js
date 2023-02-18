"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' });
    }
    try {
        // const decoded = jwt.verify(
        //   token,
        //   process.env.ACCESS_TOKEN_SECRET as string
        // ) as { payload: string };
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        console.log("id user middleware: ", req.userId);
        //   const { userId } = decoded;
        // console.log(userId);
        // console.log('decode: ', decoded);
        // console.log('decode: ', req.payload);
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: 'Invalid access token' });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=auth.js.map