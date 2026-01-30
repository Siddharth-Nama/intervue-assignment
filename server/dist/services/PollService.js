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
const Poll_1 = __importDefault(require("../models/Poll"));
class PollService {
    createPoll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const poll = new Poll_1.default(data);
            return yield poll.save();
        });
    }
    getPollById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Poll_1.default.findById(id);
        });
    }
    getLastActivePoll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Poll_1.default.findOne({ isActive: true }).sort({ createdAt: -1 });
        });
    }
    vote(pollId, optionIndex, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Atomic update: only update if userId is NOT in votedUsers
            const update = {
                $inc: { [`options.${optionIndex}.votes`]: 1 },
                $addToSet: { votedUsers: userId }
            };
            // findOneAndUpdate with condition { _id: pollId, votedUsers: { $ne: userId } }
            return yield Poll_1.default.findOneAndUpdate({ _id: pollId, votedUsers: { $ne: userId } }, update, { new: true });
        });
    }
    getPollsHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Poll_1.default.find({ isActive: false }).sort({ createdAt: -1 });
        });
    }
}
exports.default = new PollService();
