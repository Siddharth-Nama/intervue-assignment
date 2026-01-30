export const KickedOut = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] w-full bg-white relative">
          <div className="absolute top-8 bg-[#7765DA] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
               <span>✨</span> Intervue Poll
          </div>
  
          <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold text-[#1A1A1A]">You've been Kicked out !</h1>
              <p className="text-[#6E6E6E] max-w-md text-sm leading-relaxed">
                  Looks like the teacher has removed you from the poll system. Please Try again sometime.
              </p>
          </div>
      </div>
    );
  };
