export const WaitingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] w-full bg-white relative">
        <div className="absolute top-8 bg-[#7765DA] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
             <span>✨</span> Intervue Poll
        </div>

        <div className="flex flex-col items-center gap-8">
             <div className="relative w-20 h-20">
                 <div className="w-20 h-20 border-4 border-[#7765DA]/20 rounded-full"></div>
                 <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#7765DA] rounded-full border-t-transparent animate-spin"></div>
             </div>
             
             <h2 className="text-2xl font-bold text-[#1A1A1A] text-center max-w-md">
                 Wait for the teacher to ask questions...
             </h2>
        </div>

        <div className="absolute bottom-8 right-8 w-14 h-14 bg-[#7765DA] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
             </svg>
        </div>
    </div>
  );
};
