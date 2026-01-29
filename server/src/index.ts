import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import pollRoutes from './routes/pollRoutes';

dotenv.config();

connectDB();

const app = express();
// ... (socket setup) ...

app.use(cors());
app.use(express.json());

app.use('/api/polls', pollRoutes);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set('io', io); // Make io accessible in controllers

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Live Polling System API');
});

import { registerPollHandlers } from './socket/pollHandler';

// ...

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  registerPollHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
