import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/Button';

export const Landing = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    setUser({ name: '', role: selectedRole });
    if (selectedRole === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student/onboarding');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto px-4">
       <div className="flex flex-col items-center gap-6 mb-12">
          <div className="bg-[#7765DA] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
            <span>✨</span> Intervue Poll
          </div>
          <div className="text-center space-y-4 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">Welcome to the Live Polling System</h1>
              <p className="text-[#6E6E6E] text-lg leading-relaxed">
                Please select the role that best describes you to begin using the live polling system.
              </p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
          <div 
            onClick={() => setSelectedRole('student')}
            className={`
              p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200
              ${selectedRole === 'student' 
                ? 'border-[#7765DA] bg-[#7765DA]/5 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
          >
             <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">I'm a Student</h2>
             <p className="text-[#6E6E6E] leading-relaxed">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             </p>
          </div>

          <div 
            onClick={() => setSelectedRole('teacher')}
            className={`
              p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200
              ${selectedRole === 'teacher' 
                ? 'border-[#7765DA] bg-[#7765DA]/5 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
            `}
          >
             <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">I'm a Teacher</h2>
             <p className="text-[#6E6E6E] leading-relaxed">
               Submit answers and show live poll results in real-time.
             </p>
          </div>
       </div>

       <div className="w-full max-w-xs">
         <Button 
            className="w-full py-6 text-lg rounded-full" 
            onClick={handleContinue}
            disabled={!selectedRole}
         >
           Continue
         </Button>
       </div>
    </div>
  );
};
