import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const PollHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/polls/history');
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (error) {
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="text-center py-8">Loading history...</div>;
  if (history.length === 0) return <div className="text-center py-8 text-[#6E6E6E]">No past polls found.</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {history.map((poll) => {
        const totalVotes = poll.options.reduce((acc: number, opt: any) => acc + opt.votes, 0);
        return (
          <div key={poll._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start mb-4">
                 <h3 className="font-bold text-[#373737]">{poll.question}</h3>
                 <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-[#6E6E6E]">
                    {new Date(poll.createdAt).toLocaleDateString()}
                 </span>
             </div>
             
             <div className="space-y-2">
                 {poll.options.map((opt: any, idx: number) => {
                    const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                    return (
                        <div key={idx} className="text-sm">
                            <div className="flex justify-between mb-1">
                                <span className="text-[#373737]">{opt.text}</span>
                                <span className="font-medium">{percentage}% ({opt.votes})</span>
                            </div>
                            <div className="w-full bg-[#F2F2F2] rounded-full h-2">
                                <div className="bg-[#7765DA] h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                 })}
             </div>
             <div className="mt-4 text-xs text-[#6E6E6E] text-right">
                 Total Votes: {totalVotes}
             </div>
          </div>
        );
      })}
    </div>
  );
};
