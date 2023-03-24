"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get('/:id', userController_1.getUserById);
router.put('/avatar', auth_1.verifyToken, validation_1.checkImage, userController_1.updateAvatar);
router.put('/desc', auth_1.verifyToken, userController_1.updateDesc);
exports.default = router;
//# sourceMappingURL=user.js.map