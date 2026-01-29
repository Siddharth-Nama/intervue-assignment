import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
// import { CreatePoll } from '../components/teacher/CreatePoll'; // Next task
// import { LiveResults } from '../components/teacher/LiveResults'; // Future task

export const TeacherDashboard = () => {
  const { user } = useUser();
  const [activePoll, setActivePoll] = useState<any>(null); // To be typed
  const [loading, setLoading] = useState(false);

  // Check for active poll on mount
  useEffect(() => {
     // Fetch active poll logic here
  }, []);

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
       <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-[#373737]">Teacher Dashboard</h1>
          <p className="text-[#6E6E6E]">Manage polls and view results</p>
       </div>

       {loading ? (
         <div>Loading...</div>
       ) : activePoll ? (
         <div>Live Results View (Placeholder)</div>
       ) : (
         <div>Create Poll Form (Placeholder)</div>
       )}
    </div>
  );
};
