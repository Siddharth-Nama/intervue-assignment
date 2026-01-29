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

  async vote(pollId: string, optionIndex: number, userId: string): Promise<IPoll | null> {
    // Atomic update: only update if userId is NOT in votedUsers
    const update = { 
      $inc: { [`options.${optionIndex}.votes`]: 1 },
      $addToSet: { votedUsers: userId }
    };
    // findOneAndUpdate with condition { _id: pollId, votedUsers: { $ne: userId } }
    return await Poll.findOneAndUpdate(
      { _id: pollId, votedUsers: { $ne: userId } },
      update,
      { new: true }
    );
  }
}

export default new PollService();
