"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PollService_1 = __importDefault(require("../services/PollService"));
class PollController {
    createPoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { question, options, duration } = req.body;
                if (!question || !options || !duration) {
                    res.status(400).json({ message: 'Missing required fields' });
                    return;
                }
                const poll = yield PollService_1.default.createPoll({
                    question,
                    options: options.map((opt) => ({ text: opt, votes: 0 })),
                    duration,
                    isActive: true,
                    startTime: new Date()
                });
                const io = req.app.get('io');
                io.emit('poll:created', poll);
                res.status(201).json(poll);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating poll', error });
            }
        });
    }
    getActivePoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const poll = yield PollService_1.default.getLastActivePoll();
                if (!poll) {
                    res.json(null);
                    return;
                }
                res.json(Object.assign(Object.assign({}, poll.toObject()), { serverTime: new Date() }));
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching poll' });
            }
        });
    }
    getPollHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const polls = yield PollService_1.default.getPollsHistory();
                res.json(polls);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching history', error });
            }
        });
    }
}
exports.default = new PollController();
