"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicePackageController_1 = require("../controllers/servicePackageController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
//@router GET api/posts
//desc get posts
//access private
router.get('/user/:id', auth_1.verifyToken, servicePackageController_1.getAllServicePackagesByUserId);
router.get('/id/:id', servicePackageController_1.getAllServicePackagesById);
//@router POST api/posts
//desc Creates a post
//access private
router.post('/', auth_1.verifyToken, auth_1.verifyTypeUser, validation_1.checkImage, servicePackageController_1.createServicePackage);
//@router PUT api/posts
//desc update a post
//access private
router.put('/:id', auth_1.verifyToken, servicePackageController_1.updateServicePackage);
//@router DELETE api/posts
//desc delete a post
//access private
router.delete('/:id', auth_1.verifyToken, servicePackageController_1.deleteServicePackage);
exports.default = router;
//# sourceMappingURL=servicePackage.js.map