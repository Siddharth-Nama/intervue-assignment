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
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">View Poll History</h1>
          <button className="bg-[#7765DA] text-white px-6 py-2 rounded-full font-bold text-sm shadow-md">
              View Poll History
          </button>
          {/* visual redundancy in mockup, but matching "View Poll History" text */}
      </div>

      <div className="space-y-8">
      {history.map((poll) => {
        const totalVotes = poll.options.reduce((acc: number, opt: any) => acc + opt.votes, 0);
        return (
          <div key={poll._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="mb-6">
                 <h2 className="text-gray-500 text-sm font-semibold mb-2">Question</h2>
                 <h3 className="font-bold text-[#1A1A1A] text-lg bg-[#585858] text-white p-4 rounded-lg">
                    {poll.question}
                 </h3>
             </div>
             
             <div className="space-y-3">
                 {poll.options.map((opt: any, idx: number) => {
                    const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                    return (
                        <div key={idx} className="relative">
                            <div className="flex justify-between items-center bg-[#F4F4F4] rounded-lg overflow-hidden h-12 relative border border-gray-200">
                                <div 
                                    className="absolute left-0 top-0 bottom-0 bg-[#7765DA] transition-all duration-500" // Image has blue/purple fill
                                    style={{ width: `${percentage}%` }}
                                />
                                <div className="relative z-10 flex justify-between w-full px-4 items-center">
                                     <div className="flex items-center gap-3">
                                         <div className="w-6 h-6 rounded-full bg-white text-[#7765DA] flex items-center justify-center text-xs font-bold border border-[#7765DA]">
                                             {String.fromCharCode(65 + idx)}
                                         </div>
                                         <span className={`font-medium ${percentage > 50 ? 'text-white' : 'text-[#1A1A1A]'}`}>{opt.text}</span>
                                     </div>
                                     <span className={`font-bold ${percentage > 50 ? 'text-white' : 'text-[#1A1A1A]'}`}>{percentage}%</span>
                                </div>
                            </div>
                        </div>
                    );
                 })}
             </div>
          </div>
        );
      })}
      </div>
      
      <div className="fixed bottom-8 right-8">
           <div className="w-14 h-14 bg-[#7765DA] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
                <span className="text-2xl">💬</span>
           </div>
      </div>
    </div>
  );
};
