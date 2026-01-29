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
    <div className='flex flex-col gap-6 animate-in slide-in-from-right-8 duration-500'>
      <div className="flex justify-between items-start">
         <div className="bg-[#7765DA]/10 text-[#7765DA] font-bold px-3 py-1 rounded-full text-xs self-start">
            QUESTION
         </div>
         <div className="flex items-center gap-2">
            <span className="text-[#6E6E6E] text-sm font-medium">Time Remaining:</span>
            <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg
                ${timeLeft <= 10 ? 'border-red-500 text-red-500 animate-pulse' : 'border-[#7765DA] text-[#7765DA]'}
            `}>
                {timeLeft}
            </div>
         </div>
      </div>
      
      <h2 className="text-xl font-bold text-[#373737]">{poll.question}</h2>

      <div className="space-y-3">
          {poll.options.map((opt: any, idx: number) => (
             <div 
                key={idx}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3
                    ${selectedOption === idx 
                        ? 'border-[#7765DA] bg-[#7765DA]/5' 
                        : 'border-gray-200 hover:border-[#7765DA]/50'
                    }
                    ${(hasVoted || isTimeUp) ? 'opacity-50 pointer-events-none' : ''}
                `}
                onClick={() => !hasVoted && !isTimeUp && setSelectedOption(idx)}
             >
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${selectedOption === idx ? 'border-[#7765DA] bg-[#7765DA]' : 'border-gray-300'}
                 `}>
                     {selectedOption === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                 </div>
                 <span className="font-medium text-[#373737]">{opt.text}</span>
             </div>
          ))}
      </div>

      <div className="mt-4">
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={selectedOption === null || hasVoted || isVoting || isTimeUp}
          >
              {hasVoted ? 'Submitted' : isVoting ? 'Submitting...' : isTimeUp ? 'Time Up' : 'Submit Answer'}
          </Button>
      </div>
    </div>
  );
};
