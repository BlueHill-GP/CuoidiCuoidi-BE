"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const momoControler_1 = require("../controllers/momoControler");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
router.get('/', paymentController_1.handleVnPayIPN);
router.post('/momo', momoControler_1.getQrCode);
exports.default = router;
//# sourceMappingURL=payment.js.map