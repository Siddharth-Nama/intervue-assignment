import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-[#373737] font-medium">{label}</label>}
      <input 
        className={`px-4 py-3 rounded-lg bg-[#F2F2F2] border border-transparent focus:border-[#7765DA] focus:bg-white outline-none transition-all ${className}`}
        {...props} 
      />
    </div>
  );
};
