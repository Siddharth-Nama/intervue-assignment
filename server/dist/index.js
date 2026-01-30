"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const pollRoutes_1 = __importDefault(require("./routes/pollRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
// ... (socket setup) ...
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/polls', pollRoutes_1.default);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.set('io', io); // Make io accessible in controllers
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Live Polling System API');
});
const pollHandler_1 = require("./socket/pollHandler");
// ...
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    (0, pollHandler_1.registerPollHandlers)(io, socket);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
