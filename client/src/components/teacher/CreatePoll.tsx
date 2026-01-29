import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from 'react-hot-toast';

interface CreatePollProps {
  onPollCreated: (poll: any) => void;
}

export const CreatePoll = ({ onPollCreated }: CreatePollProps) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    } else {
        toast.error("Maximum 6 options allowed");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!question.trim()) {
        toast.error("Please enter a question");
        return;
    }
    if (options.some(opt => !opt.trim())) {
        toast.error("Please fill all options");
        return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question,
            options: options.filter(o => o.trim()),
            duration
        })
      });
      
      if (!response.ok) throw new Error('Failed to create poll');
      
      const data = await response.json();
      toast.success("Poll created successfully!");
      onPollCreated(data);
    } catch (error) {
      toast.error("Failed to create poll");
      console.error(error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <h2 className="text-xl font-bold text-[#373737]">Ask a new question</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
            <label className="text-[#373737] font-medium mb-2 block">Question</label>
            <textarea 
                className="w-full px-4 py-3 rounded-lg bg-[#F2F2F2] border border-transparent focus:border-[#7765DA] focus:bg-white outline-none transition-all resize-none h-32"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
        </div>

        <div className="space-y-3">
             <label className="text-[#373737] font-medium block">Options</label>
             {options.map((opt, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                    <span className="w-6 h-6 rounded-full bg-[#7765DA] text-white flex items-center justify-center text-xs flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                    </span>
                    <Input 
                        value={opt} 
                        onChange={(e) => handleOptionChange(idx, e.target.value)} 
                        placeholder={`Option ${idx + 1}`}
                        className="flex-1"
                    />
                    {options.length > 2 && (
                         <button type="button" onClick={() => handleRemoveOption(idx)} className="text-red-400 hover:text-red-600 px-2">
                             ✕
                         </button>
                    )}
                </div>
             ))}
             {options.length < 6 && (
                 <button type="button" onClick={handleAddOption} className="text-[#7765DA] font-semibold text-sm hover:underline ml-8">
                     + Add another option
                 </button>
             )}
        </div>

        <div className="flex justify-between items-center mt-4">
             <div className="flex items-center gap-2">
                  <label className="font-medium text-[#373737]">Timer:</label>
                  <select 
                     value={duration} 
                     onChange={(e) => setDuration(Number(e.target.value))}
                     className="bg-[#F2F2F2] rounded-lg px-3 py-2 outline-none focus:border-[#7765DA] border border-transparent"
                  >
                      <option value={30}>30 seconds</option>
                      <option value={60}>60 seconds</option>
                      <option value={120}>2 minutes</option>
                  </select>
             </div>
             
             <Button type="submit" disabled={isSubmitting}>
                 {isSubmitting ? 'Asking...' : 'Ask Question'}
             </Button>
        </div>
      </form>
    </div>
  );
};
