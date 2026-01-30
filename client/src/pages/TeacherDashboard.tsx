import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { CreatePoll } from '../components/teacher/CreatePoll';
import { PollHistory } from '../components/teacher/PollHistory';
import { LiveResults } from '../components/teacher/LiveResults';
import { toast } from 'react-hot-toast';

export const TeacherDashboard = () => {
  const { user } = useUser();
  const [activePoll, setActivePoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'live' | 'history'>('live');

  const fetchActivePoll = async () => {
      try {
          const res = await fetch('http://localhost:5001/api/polls/active');
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
      setView('live');
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
       <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#373737]">{view === 'live' ? (activePoll ? 'Live Poll' : 'Teacher Dashboard') : 'Poll History'}</h1>
            <p className="text-[#6E6E6E]">
                {view === 'live' 
                    ? (activePoll ? 'Monitor student responses' : 'Create a new poll') 
                    : 'View past poll results'}
            </p>
          </div>
          <div className="flex bg-[#F2F2F2] rounded-lg p-1">
              <button 
                onClick={() => setView('live')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'live' ? 'bg-white shadow text-[#7765DA]' : 'text-[#6E6E6E] hover:text-[#373737]'}`}
              >
                  Live
              </button>
              <button 
                onClick={() => setView('history')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'history' ? 'bg-white shadow text-[#7765DA]' : 'text-[#6E6E6E] hover:text-[#373737]'}`}
              >
                  History
              </button>
          </div>
       </div>

       {view === 'live' ? (
           activePoll ? (
             <LiveResults poll={activePoll} />
           ) : (
             <CreatePoll onPollCreated={handlePollCreated} />
           )
       ) : (
           <PollHistory />
       )}
    </div>
  );
};
