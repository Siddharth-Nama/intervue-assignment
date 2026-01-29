import { Server, Socket } from 'socket.io';
import PollService from '../services/PollService';

export const registerPollHandlers = (io: Server, socket: Socket) => {
  const onJoin = (payload: any) => {
    console.log(`User joined: ${socket.id}`, payload);
  };

  const onVote = async (payload: { pollId: string, optionIndex: number, userId: string }) => {
    try {
      const { pollId, optionIndex, userId } = payload;
      const updatedPoll = await PollService.vote(pollId, optionIndex, userId);
      if (updatedPoll) {
        io.emit('poll:updated', updatedPoll);
      }
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  socket.on("poll:join", onJoin);
  socket.on("poll:vote", onVote);
};
