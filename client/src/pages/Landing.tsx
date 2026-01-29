import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/Button';

export const Landing = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setUser({ name: '', role }); // Reset name, set role
    if (role === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student/onboarding');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="text-center space-y-2">
          <span className="bg-[#7765DA] text-white px-3 py-1 rounded-full text-xs font-medium">Intervue Poll</span>
          <h1 className="text-4xl font-bold text-[#373737]">Welcome to the Live Polling System</h1>
          <p className="text-[#6E6E6E] max-w-lg">Please select the role that best describes you to begin using the live polling system</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#7765DA] hover:shadow-lg transition-all cursor-pointer group" onClick={() => handleRoleSelect('student')}>
             <h2 className="text-xl font-bold mb-2 group-hover:text-[#7765DA]">I'm a Student</h2>
             <p className="text-[#6E6E6E] text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
          </div>

           <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#7765DA] hover:shadow-lg transition-all cursor-pointer group" onClick={() => handleRoleSelect('teacher')}>
             <h2 className="text-xl font-bold mb-2 group-hover:text-[#7765DA]">I'm a Teacher</h2>
             <p className="text-[#6E6E6E] text-sm">Submit answers and view live poll results in real-time.</p>
          </div>
       </div>

       <Button onClick={() => {}} className="opacity-0 pointer-events-none">Continue</Button> 
       {/* Button hidden as card click handles it, matching Figma somewhat or can add Continue button state */}
    </div>
  );
};
