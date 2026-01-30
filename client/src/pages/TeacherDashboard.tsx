import { useState, useEffect } from 'react';

import { CreatePoll } from '../components/teacher/CreatePoll';
import { PollHistory } from '../components/teacher/PollHistory';
import { LiveResults } from '../components/teacher/LiveResults';
import { toast } from 'react-hot-toast';

export const TeacherDashboard = () => {
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
    <div className="w-full bg-[#FAFAFA] min-h-screen">
      {/* Header for Dashboard/History toggles only if not in Live Poll? 
          Actually design shows separate pages.
          If Active Poll, full screen.
          If Create Poll, full screen (centered).
          I will keep the navigation simple.
      */}
      
       {view === 'live' ? (
           activePoll ? (
             <LiveResults poll={activePoll} onAskNew={() => { setActivePoll(null); /* Logic to stop poll optional */ }} />
           ) : (
             <CreatePoll onPollCreated={handlePollCreated} />
           )
       ) : (
           <PollHistory />
       )}

       {/* Floating Toggle for View - Temporary to verify history */}
       {!activePoll && (
           <div className="fixed bottom-8 left-8 z-50">
              <button 
                  onClick={() => setView(view === 'live' ? 'history' : 'live')}
                  className="bg-white border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm font-bold text-[#7765DA]"
              >
                  {view === 'live' ? 'View History' : 'Back to Dashboard'}
              </button>
           </div>
       )}
    </div>
  );
};
