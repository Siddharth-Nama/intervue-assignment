import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

interface LiveResultsProps {
  poll: any;
}

export const LiveResults = ({ poll: initialPoll }: LiveResultsProps) => {
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

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
       <div className="flex justify-between items-start">
           <div>
               <span className="bg-[#7765DA]/10 text-[#7765DA] font-bold px-3 py-1 rounded-full text-xs">LIVE POLLING</span>
               <h2 className="text-xl font-bold text-[#373737] mt-3">{poll.question}</h2>
           </div>
           
           <div className="flex flex-col items-end">
               <span className="text-3xl font-bold text-[#373737]">{totalVotes}</span>
               <span className="text-sm text-[#6E6E6E]">Total votes</span>
           </div>
       </div>

       <div className="space-y-4">
           {poll.options.map((opt: any, idx: number) => {
               const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
               return (
                   <div key={idx} className="relative">
                       <div className="flex justify-between mb-1 text-sm font-medium text-[#373737]">
                           <span>{opt.text}</span>
                           <span>{percentage}%</span>
                       </div>
                       <div className="w-full bg-[#F2F2F2] rounded-full h-12 relative overflow-hidden flex items-center px-4 border border-transparent">
                            <div 
                                className="absolute left-0 top-0 bottom-0 bg-[#7765DA]/20 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                            />
                            <span className="z-10 text-[#373737] font-semibold">{opt.votes} votes</span>
                       </div>
                   </div>
               );
           })}
       </div>

       <div className='mt-8 pt-6 border-t border-gray-100 flex justify-between items-center'>
            <div className='text-[#6E6E6E] text-sm'>
                Waiting for remaining students...
            </div>
            {/* Can add "End Poll" button here */}
       </div>
    </div>
  );
};
