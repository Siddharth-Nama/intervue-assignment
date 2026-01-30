import { useState } from 'react';
import { usePollTimer } from '../../hooks/usePollTimer';
import { Button } from '../ui/Button';

interface ActivePollProps {
  poll: any;
  onVote: (optionIndex: number) => void;
  isVoting: boolean;
  hasVoted: boolean;
  serverTime?: string | Date;
}

export const ActivePoll = ({ poll, onVote, isVoting, hasVoted, serverTime }: ActivePollProps) => {
  const timeLeft = usePollTimer(poll.startTime, poll.duration, serverTime);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOption !== null && !hasVoted) {
      onVote(selectedOption);
    }
  };

  const isTimeUp = timeLeft === 0;

  return (
    <div className='flex flex-col items-center min-h-[90vh] w-full bg-white relative p-4'>
        {/* Header Pill */}
        <div className="absolute top-8 bg-[#7765DA] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
             <span>✨</span> Intervue Poll
        </div>

        <div className="w-full max-w-3xl mt-24">
             {/* Question Header */}
             <div className="flex items-center gap-4 mb-2">
                 <h2 className="font-bold text-[#1A1A1A]">Question 1</h2>
                 <div className={`flex items-center gap-1 font-bold text-sm ${timeLeft <= 10 ? 'text-red-500' : 'text-red-500'}`}>
                      <span>⏱</span> {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                 </div>
             </div>

             {/* Question Box */}
             <div className="bg-[#585858] text-white p-6 rounded-t-xl rounded-b-md shadow-sm mb-6">
                 <h3 className="text-lg font-medium">{poll.question}</h3>
             </div>

             {/* Options */}
             <div className="space-y-3">
                 {poll.options.map((opt: any, idx: number) => (
                    <div 
                        key={idx}
                        onClick={() => !hasVoted && !isTimeUp && setSelectedOption(idx)}
                        className={`
                            flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all bg-[#F9F9F9] hover:bg-white
                            ${selectedOption === idx ? 'border-[#7765DA] shadow-sm' : 'border-transparent hover:border-gray-200'}
                            ${(hasVoted || isTimeUp) ? 'opacity-60 pointer-events-none' : ''}
                        `}
                    >
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                             ${selectedOption === idx ? 'bg-[#7765DA] border-[#7765DA] text-white' : 'border-gray-300 text-gray-400'}
                         `}>
                             <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                         </div>
                         <span className="font-medium text-[#1A1A1A]">{opt.text}</span>
                    </div>
                 ))}
             </div>

             {/* Submit Button */}
             <div className="flex justify-end mt-8">
                 <Button 
                    className="rounded-full px-12 py-3" 
                    onClick={handleSubmit}
                    disabled={selectedOption === null || hasVoted || isVoting || isTimeUp}
                 >
                     {hasVoted ? 'Submitted' : isVoting ? 'Submitting...' : 'Submit'}
                 </Button>
             </div>
        </div>

        <div className="absolute bottom-8 right-8 w-14 h-14 bg-[#7765DA] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
             <span className="text-2xl">💬</span>
        </div>
    </div>
  );
};
