import Poll, { IPoll } from '../models/Poll';

class PollService {
  async createPoll(data: Partial<IPoll>): Promise<IPoll> {
    const poll = new Poll(data);
    return await poll.save();
  }

  async getPollById(id: string): Promise<IPoll | null> {
    return await Poll.findById(id);
  }

  async checkActivePollExpiration(): Promise<void> {
      const poll = await Poll.findOne({ isActive: true }).sort({ createdAt: -1 });
      if (poll && poll.startTime) {
          const endTime = new Date(poll.startTime).getTime() + poll.duration * 1000;
          if (Date.now() > endTime) {
              poll.isActive = false;
              await poll.save();
          }
      }
  }

  async getLastActivePoll(): Promise<IPoll | null> {
    await this.checkActivePollExpiration();
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

  async getPollsHistory(): Promise<IPoll[]> {
    await this.checkActivePollExpiration();
    return await Poll.find({ isActive: false }).sort({ createdAt: -1 });
  }
}

export default new PollService();
