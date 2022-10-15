"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post('/create', userController_1.createprofileController);
router.post('/verify', userController_1.verifyemailController);
exports.default = router;
