import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const StudentOnboarding = () => {
  const [name, setName] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUser({ ...user, name, role: 'student' });
      navigate('/student/poll');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 animate-in zoom-in-95 duration-300">
      <h2 className="text-2xl font-bold text-[#373737]">Enter your name...</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input 
          placeholder="John Doe" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <Button type="submit" disabled={!name.trim()}>
          Continue
        </Button>
      </form>
    </div>
  );
};
