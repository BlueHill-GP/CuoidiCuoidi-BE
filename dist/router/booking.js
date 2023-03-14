"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middleware/auth");
const servicePackage_1 = require("../middleware/servicePackage");
const router = (0, express_1.Router)();
//@router GET api/posts
//desc get posts
//access private
// router.get('/', verifyToken, getPosts);
//@router POST api/posts
//desc Creates a post
//access private
router.post('/', servicePackage_1.verifyPackageService, bookingController_1.createABooking);
router.get('/user/', auth_1.verifyToken, bookingController_1.getAllBookingByUser);
;
//@router PUT api/posts
//desc update a post
//access private
// router.put('/:id', updateBooking);
router.put('/:id', auth_1.verifyToken, servicePackage_1.verifyPackageService, bookingController_1.updateBookingStatus);
//@router DELETE api/posts
//desc delete a post
//access private
// router.delete('/:id', verifyToken, deletePost);
exports.default = router;
//# sourceMappingURL=booking.js.map