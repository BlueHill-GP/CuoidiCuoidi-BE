"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testSocketIo_1 = require("../controllers/testSocketIo");
const router = (0, express_1.Router)();
router.post('/', testSocketIo_1.createPostNotify);
exports.default = router;
//# sourceMappingURL=socketIo.js.map