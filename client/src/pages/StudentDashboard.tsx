import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useSocket } from '../hooks/useSocket';
import { WaitingScreen } from '../components/student/WaitingScreen';
import { ActivePoll } from '../components/student/ActivePoll';
import { LiveResults } from '../components/teacher/LiveResults'; // Reusing for now
import { toast } from 'react-hot-toast';

export const StudentDashboard = () => {
  const { user } = useUser();
  const { socket } = useSocket();
  const [poll, setPoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Initial fetch (Resilience)
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/polls/active`);
        if (res.ok) {
           const data = await res.json();
           if (data) {
               setPoll(data);
               // Check if user already voted (Resilience)
               if (data.votedUsers && data.votedUsers.includes(user.name)) { // Using name as ID for now simplistically, or socketId if backend tracks it
                   // Wait, checking name in votedUsers array (schema has strings).
                   // ideally use IDs, but assignment said "Enter name".
                   // We'll use name as ID for strictly uniqueness per session/tab requirement?
                   // No, assignment says "Enter a name... (unique per session)".
                   // We should pass name/userID.
                   setHasVoted(true);
               }
           }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [user.name]);

  // Socket Listeners
  useEffect(() => {
    socket.on('poll:created', (newPoll: any) => {
        setPoll(newPoll);
        setHasVoted(false);
        toast.success("New poll started!");
    });

    socket.on('poll:updated', (updatedPoll: any) => {
        // If we have a poll and it matches, update it
        setPoll((prev: any) => {
            if (prev && prev._id === updatedPoll._id) {
                return updatedPoll;
            }
            return prev;
        });
    });

    return () => {
        socket.off('poll:created');
        socket.off('poll:updated');
    };
  }, [socket]);

  const handleVote = (optionIndex: number) => {
    setIsVoting(true);
    // Optimistic update? No, wait for confirmation or just emit.
    // Emit vote
    // userId: user.name is problematic if duplicates allowed, but let's assume unique or use socket.id
    // But socket.id changes on refresh.
    // Assignment: "Enter a name on the first visit (unique per session/tab)".
    // So distinct tabs have distinct names?
    // UserContext stores user. But no ID.
    // I'll stick to user.name as ID for the assignment constraint.
    
    socket.emit('poll:vote', { 
        pollId: poll._id, 
        optionIndex, 
        userId: user.name 
    });
    
    // Optimistically set voted
    setHasVoted(true);
    setIsVoting(false);
    toast.success("Vote submitted!");
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  if (!poll || !poll.isActive) return <WaitingScreen />;

  // Check if time up
  const now = Date.now();
  // Adjust for server offset if we implemented it (Task 14 did return serverTime, logic pending).
  // For now simple client time.
  const endTime = new Date(poll.startTime).getTime() + poll.duration * 1000;
  const isTimeUp = now > endTime;

  if (hasVoted || isTimeUp) {
      // Show results view for student (similar to LiveResults but maybe read only?)
      // Design shows "Wait for teacher..." and results.
      // I'll reuse LiveResults layout for consistency, or active poll style with results.
      // Mockup shows "Desktop - 660" which looks like Teacher Results.
      // Student usually just sees "Submitted" or results.
      // I will render the ActivePoll component but in "voted" state which shows results if I implemented it there?
      // Wait, ActivePoll currently shows checkmarks.
      // I'll use a version of LiveResults for student but without sidebar if needed, or just ActivePoll.
      // Let's use ActivePoll with state validation.
      return (
        <div className="w-full min-h-screen bg-white">
             {/* If voted, show LiveResults-like view or the "Wait" screen with results?
                 Image 4 "Desktop - 660" looks like Student after vote (has chat bubble).
                 It shows the Bar Chart.
             */}
             <LiveResults poll={poll} onAskNew={() => {}} /> 
             {/* Reusing LiveResults for Student View (it has sidebar too which is good) */}
        </div>
      );
  }

  return (
    <div className="w-full min-h-screen bg-white">
        <ActivePoll 
            poll={poll} 
            onVote={handleVote} 
            isVoting={isVoting} 
            hasVoted={hasVoted}
            serverTime={poll.serverTime}
        />
    </div>
  );
};
