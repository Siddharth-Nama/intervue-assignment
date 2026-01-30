import { useState } from 'react';

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');

  // Mock data matching image
  const participants = [
      { name: 'Rahul Arora', status: 'online' },
      { name: 'Pushpender Rautela', status: 'online' },
      { name: 'Prijul Zalpuri', status: 'online' },
      { name: 'Harjeen N', status: 'online' },
      { name: 'Ashwini Sharma', status: 'online' },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col shadow-sm">
        <div className="flex border-b border-gray-200">
             <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'chat' ? 'text-[#7765DA] border-b-2 border-[#7765DA]' : 'text-gray-500'}`}
             >
                 Chat
             </button>
             <button 
                onClick={() => setActiveTab('participants')}
                className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'participants' ? 'text-[#7765DA] border-b-2 border-[#7765DA]' : 'text-gray-500'}`}
             >
                 Participants
             </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
             {activeTab === 'chat' ? (
                 <div className="space-y-4">
                      {/* Empty state or mock chat */}
                      <div className="text-center text-xs text-gray-400 mt-10">No messages yet</div>
                 </div>
             ) : (
                 <div className="space-y-3">
                     <div className="flex justify-between text-xs text-gray-400 font-medium px-2">
                         <span>Name</span>
                         <span>Action</span>
                     </div>
                     {participants.map((p, i) => (
                         <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                             <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                 <span className="text-sm font-medium text-[#1A1A1A]">{p.name}</span>
                             </div>
                             <button className="text-xs text-[#7765DA] hover:underline">Kick out</button>
                         </div>
                     ))}
                 </div>
             )}
        </div>
    </div>
  );
};
