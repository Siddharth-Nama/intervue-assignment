import Poll, { IPoll } from '../models/Poll';

class PollService {
  async createPoll(data: Partial<IPoll>): Promise<IPoll> {
    const poll = new Poll(data);
    return await poll.save();
  }

  async getPollById(id: string): Promise<IPoll | null> {
    return await Poll.findById(id);
  }

  async getLastActivePoll(): Promise<IPoll | null> {
    return await Poll.findOne({ isActive: true }).sort({ createdAt: -1 });
  }

  async vote(pollId: string, optionIndex: number): Promise<IPoll | null> {
    // Atomic update to ensure race condition handling
    const update = { $inc: { [`options.${optionIndex}.votes`]: 1 } };
    return await Poll.findByIdAndUpdate(pollId, update, { new: true });
  }
}

export default new PollService();
