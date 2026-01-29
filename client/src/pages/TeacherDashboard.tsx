import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { CreatePoll } from '../components/teacher/CreatePoll';
import { LiveResults } from '../components/teacher/LiveResults';
import { toast } from 'react-hot-toast';

export const TeacherDashboard = () => {
  const { user } = useUser();
  const [activePoll, setActivePoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchActivePoll = async () => {
      try {
          const res = await fetch('http://localhost:5000/api/polls/active');
          if (res.ok) {
              const data = await res.json();
              setActivePoll(data);
          }
      } catch (error) {
          console.error("Error fetching poll", error);
          toast.error("Could not fetch active poll");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
     fetchActivePoll();
  }, []);

  const handlePollCreated = (poll: any) => {
      setActivePoll(poll);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
       <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-[#373737]">{activePoll ? 'Live Poll' : 'Teacher Dashboard'}</h1>
          <p className="text-[#6E6E6E]">{activePoll ? 'Monitor student responses in real-time' : 'Create a new poll to get started'}</p>
       </div>

       {activePoll ? (
         <LiveResults poll={activePoll} />
       ) : (
         <CreatePoll onPollCreated={handlePollCreated} />
       )}
    </div>
  );
};
