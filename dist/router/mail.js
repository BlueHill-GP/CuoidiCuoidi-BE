"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailerController_1 = require("../controllers/mailerController");
const router = express_1.default.Router();
router.post('/register', mailerController_1.mailRegister);
exports.default = router;
//# sourceMappingURL=mail.js.map