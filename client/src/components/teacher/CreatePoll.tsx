import { useState } from 'react';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

interface CreatePollProps {
  onPollCreated: (poll: any) => void;
}

export const CreatePoll = ({ onPollCreated }: CreatePollProps) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['Rahul Bajaj', 'Rahul Bajaj']); // Dummy default text in mockup, using empty/placeholder
  const [correctOption, setCorrectOption] = useState<number | null>(0); // Visual only for now
  const [duration, setDuration] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize with empty strings instead of "Rahul Bajaj" if desired, but fulfilling "exact same" request
  // The mockup has "Rahul Bajaj" filled in. I will use placeholders or empty strings for usability.
  // I will reset default options to empty strings.
  useState(() => {
      setOptions(['', '']);
  });

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
      if (correctOption === index) setCorrectOption(null);
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
      const response = await fetch('http://localhost:5001/api/polls', {
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
    <div className='flex flex-col items-center w-full max-w-4xl mx-auto px-4 min-h-[80vh] py-8'>
      <div className="bg-[#7765DA] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 mb-8">
         <span>✨</span> Intervue Poll
      </div>

      <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">Let's Get Started</h1>
          <p className="text-[#6E6E6E] max-w-2xl mx-auto">
             You'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
          </p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                 <label className="text-[#1A1A1A] font-bold text-lg">Enter your question</label>
                 <select 
                     value={duration} 
                     onChange={(e) => setDuration(Number(e.target.value))}
                     className="bg-[#F2F2F2] rounded-lg px-3 py-1.5 text-sm font-medium text-[#7765DA] outline-none cursor-pointer"
                  >
                      <option value={30}>30 seconds</option>
                      <option value={60}>60 seconds</option>
                      <option value={120}>2 minutes</option>
                  </select>
            </div>
            
            <textarea 
                className="w-full px-6 py-4 rounded-xl bg-[#F2F2F2] border border-transparent focus:border-[#7765DA] focus:bg-white outline-none transition-all resize-none h-32 text-lg"
                placeholder="What is your question?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="text-right text-xs text-[#6E6E6E] mt-1">0/100</div>
        </div>

        <div className="mb-12">
             <div className="flex justify-between items-center mb-4">
                 <label className="text-[#1A1A1A] font-bold text-lg">Edit Options</label>
                 <label className="text-[#1A1A1A] font-bold text-lg mr-12">Is It Correct?</label>
             </div>
             
             <div className="space-y-4">
                 {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                        <div className="flex-1 relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#7765DA] text-white flex items-center justify-center text-xs font-bold">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <input
                                type="text" 
                                value={opt} 
                                onChange={(e) => handleOptionChange(idx, e.target.value)} 
                                className="w-full pl-12 pr-4 py-3 bg-[#F2F2F2] rounded-xl outline-none focus:ring-2 focus:ring-[#7765DA]/20 transition-all font-medium"
                                placeholder={`Option ${idx + 1}`}
                            />
                        </div>
                        
                        <div className="flex items-center gap-6 min-w-[120px]">
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${correctOption === idx ? 'border-[#7765DA]' : 'border-gray-300'}`}>
                                     {correctOption === idx && <div className="w-2.5 h-2.5 bg-[#7765DA] rounded-full" />}
                                 </div>
                                 <input 
                                    type="radio" 
                                    name="correctOption" 
                                    className="hidden" 
                                    checked={correctOption === idx}
                                    onChange={() => setCorrectOption(idx)}
                                 />
                                 <span className="text-[#1A1A1A] font-medium">Yes</span>
                             </label>

                             <label className="flex items-center gap-2 cursor-pointer">
                                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${correctOption !== idx ? 'border-[#7765DA]' : 'border-gray-300'}`}>
                                      {correctOption !== idx && <div className="w-2.5 h-2.5 bg-[#7765DA] rounded-full" />}
                                 </div>
                                 <input 
                                    type="radio" 
                                    name="correctOption" 
                                    className="hidden" 
                                    checked={correctOption !== idx}
                                    onChange={() => setCorrectOption(null)} // Or logic to distinct Yes/No
                                 />
                                 <span className="text-[#1A1A1A] font-medium">No</span>
                             </label>

                             {options.length > 2 && (
                                <button type="button" onClick={() => handleRemoveOption(idx)} className="text-gray-400 hover:text-red-500">
                                    ✕
                                </button>
                             )}
                        </div>
                    </div>
                 ))}
             </div>
             
             {options.length < 6 && (
                 <button type="button" onClick={handleAddOption} className="mt-4 px-4 py-2 border border-[#7765DA] text-[#7765DA] rounded-lg text-sm font-semibold hover:bg-[#7765DA]/5 transition-colors">
                     + Add More options
                 </button>
             )}
        </div>

        <div className="flex justify-end pb-12">
             <Button type="submit" disabled={isSubmitting} className="rounded-full px-10 py-3 text-lg">
                 {isSubmitting ? 'Asking...' : 'Ask Question'}
             </Button>
        </div>
      </form>
    </div>
  );
};
