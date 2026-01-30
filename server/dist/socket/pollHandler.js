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
exports.registerPollHandlers = void 0;
const PollService_1 = __importDefault(require("../services/PollService"));
const registerPollHandlers = (io, socket) => {
    const onJoin = (payload) => {
        console.log(`User joined: ${socket.id}`, payload);
    };
    const onVote = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { pollId, optionIndex, userId } = payload;
            const updatedPoll = yield PollService_1.default.vote(pollId, optionIndex, userId);
            if (updatedPoll) {
                io.emit('poll:updated', updatedPoll);
            }
        }
        catch (error) {
            console.error("Vote error:", error);
        }
    });
    socket.on("poll:join", onJoin);
    socket.on("poll:vote", onVote);
};
exports.registerPollHandlers = registerPollHandlers;
