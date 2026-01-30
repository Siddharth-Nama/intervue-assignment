"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PollController_1 = __importDefault(require("../controllers/PollController"));
const router = (0, express_1.Router)();
router.post('/', PollController_1.default.createPoll);
router.get('/active', PollController_1.default.getActivePoll);
router.get('/history', PollController_1.default.getPollHistory);
exports.default = router;
