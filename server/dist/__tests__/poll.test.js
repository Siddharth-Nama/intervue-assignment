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
const mongoose_1 = __importDefault(require("mongoose"));
const PollService_1 = __importDefault(require("../services/PollService"));
const Poll_1 = __importDefault(require("../models/Poll"));
describe('PollService', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to a test database or mock
        // For simplicity in this assignment, we might mock Mongoose or use a memory db
        // But since I didn't set up memory db, I will mock the model methods.
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    it('should create a poll', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPoll = {
            question: 'Test Poll',
            options: [{ text: 'A', votes: 0 }, { text: 'B', votes: 0 }],
            duration: 60,
            isActive: true
        };
        jest.spyOn(Poll_1.default.prototype, 'save').mockResolvedValue(mockPoll);
        const result = yield PollService_1.default.createPoll({
            question: 'Test Poll',
            options: [{ text: 'A', votes: 0 }, { text: 'B', votes: 0 }],
            duration: 60
        });
        expect(result.question).toBe('Test Poll');
    }));
    // More tests...
});
