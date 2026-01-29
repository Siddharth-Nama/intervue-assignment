import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans text-[#373737]">
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
};
