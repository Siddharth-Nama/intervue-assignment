export const WaitingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-700">
        <div className="relative w-32 h-32 mb-8">
             <div className="absolute inset-0 border-4 border-[#7765DA]/20 rounded-full animate-ping"></div>
             <div className="absolute inset-0 border-4 border-[#7765DA] rounded-full flex items-center justify-center">
                 <span className="text-4xl">⏳</span>
             </div>
        </div>
        <h2 className="text-2xl font-bold text-[#373737] mb-2">Waiting for Teacher...</h2>
        <p className="text-[#6E6E6E]">The question will appear here as soon as it's asked/created.</p>
    </div>
  );
};
