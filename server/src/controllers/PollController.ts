import { Request, Response } from 'express';
import PollService from '../services/PollService';

class PollController {
  async createPoll(req: Request, res: Response): Promise<void> {
    try {
      const { question, options, duration } = req.body;
      if (!question || !options || !duration) {
         res.status(400).json({ message: 'Missing required fields' });
         return;
      }
      
      const poll = await PollService.createPoll({
        question,
        options: options.map((opt: string) => ({ text: opt, votes: 0 })),
        duration,
        isActive: true,
        startTime: new Date()
      });
      
      const io = req.app.get('io');
      io.emit('poll:created', poll);

      res.status(201).json(poll);
    } catch (error) {
      res.status(500).json({ message: 'Error creating poll', error });
    }
  }

  async getActivePoll(req: Request, res: Response): Promise<void> {
      try {
          const poll = await PollService.getLastActivePoll();
          if (!poll) {
             res.json(null);
             return;
          }
          res.json({ ...poll.toObject(), serverTime: new Date() });
      } catch (error) {
          res.status(500).json({ message: 'Error fetching poll' });
      }
  }

  async getPollHistory(req: Request, res: Response): Promise<void> {
      try {
          const polls = await PollService.getPollsHistory();
          res.json(polls);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching history', error });
      }
  }
}

export default new PollController();
