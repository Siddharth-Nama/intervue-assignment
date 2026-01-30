import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { Sidebar } from '../Sidebar';

interface LiveResultsProps {
  poll: any;
  onAskNew: () => void; // Callback to reset to create poll state
}

export const LiveResults = ({ poll: initialPoll, onAskNew }: LiveResultsProps) => {
  const [poll, setPoll] = useState(initialPoll);
  const { socket } = useSocket();

  useEffect(() => {
    setPoll(initialPoll);
  }, [initialPoll]);

  useEffect(() => {
    socket.on('poll:updated', (updatedPoll: any) => {
       if (updatedPoll._id === poll._id) {
           setPoll(updatedPoll);
       }
    });

    return () => {
        socket.off('poll:updated');
    };
  }, [poll._id, socket]);

  const totalVotes = poll.options.reduce((acc: number, opt: any) => acc + opt.votes, 0);

  // Timer logic for display "00:15" - reusing existing hook logic or just static/from poll data?
  // Teacher view usually shows "Time Remaining" or just the static duration if poll ended.
  // Mockup shows "00:15" in red next to Question 1.
  // I will just show "Live" status or similar for now, or remaining time if passed props.
  // Ideally usePollTimer here too.

  return (
    <div className='flex h-[90vh] w-full bg-white'>
        {/* Main Content */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                      <h2 className="font-bold text-[#1A1A1A]">Question 1</h2>
                      <div className="text-red-500 font-bold text-sm flex items-center gap-1">
                          <span>⏱</span> 00:15 {/* Placeholder for sync timer in teacher view */}
                      </div>
                  </div>
             </div>

             <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col justify-center">
                 {/* Question Box */}
                 <div className="bg-[#585858] text-white p-6 rounded-t-xl rounded-b-md shadow-sm mb-6">
                     <h3 className="text-lg font-medium">{poll.question}</h3>
                 </div>

                 {/* Results Bars */}
                 <div className="space-y-4">
                     {poll.options.map((opt: any, idx: number) => {
                         const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                         return (
                            <div key={idx} className="relative">
                                <div className="flex justify-between items-center bg-[#F4F4F4] rounded-lg overflow-hidden h-14 relative border border-gray-200">
                                    <div 
                                        className="absolute left-0 top-0 bottom-0 bg-[#7765DA] transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                    <div className="relative z-10 flex justify-between w-full px-4 items-center">
                                         <div className="flex items-center gap-3">
                                             <div className="w-8 h-8 rounded-full bg-white text-[#7765DA] flex items-center justify-center text-sm font-bold border border-[#7765DA] shadow-sm">
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

                 <div className="flex justify-end mt-12">
                     <button
                        onClick={onAskNew} 
                        className="bg-[#7765DA] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#6854c8] transition-colors"
                     >
                         + Ask a new question
                     </button>
                 </div>

                 <p className="text-center text-gray-400 text-sm font-medium mt-8">
                     Wait for the teacher to ask a new question...
                 </p>
             </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
    </div>
  );
};
