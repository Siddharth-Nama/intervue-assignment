import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/Button';

export const StudentOnboarding = () => {
  const [name, setName] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUser({ ...user, name, role: 'student' });
      navigate('/student/poll');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto px-4">
       <div className="flex flex-col items-center gap-6 mb-12">
          <div className="bg-[#7765DA] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
            <span>✨</span> Intervue Poll
          </div>
          <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">Let's Get Started</h1>
              <p className="text-[#6E6E6E] text-lg leading-relaxed max-w-lg mx-auto">
                If you're a student, you'll be able to <strong>submit your answers</strong>, participate in live polls, and see how your responses compare with your classmates.
              </p>
          </div>
       </div>

       <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-8">
         <div className="space-y-2">
           <label className="block text-sm font-medium text-[#1A1A1A] ml-1">Enter your Name</label>
           <input
             type="text"
             className="w-full px-6 py-4 bg-[#F2F2F2] rounded-xl outline-none focus:ring-2 focus:ring-[#7765DA]/20 transition-all text-[#1A1A1A] placeholder-gray-400"
             placeholder="Rahul Bajaj"
             value={name} 
             onChange={(e) => setName(e.target.value)}
             autoFocus
           />
         </div>

         <div className="flex justify-center">
            <Button 
                type="submit" 
                disabled={!name.trim()}
                className="w-48 py-6 text-lg rounded-full"
            >
              Continue
            </Button>
         </div>
       </form>
    </div>
  );
};
