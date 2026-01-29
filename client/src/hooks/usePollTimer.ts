import { useState, useEffect } from 'react';

export const usePollTimer = (startTime: string | Date, duration: number, serverTime?: string | Date) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!startTime) return;

    const start = new Date(startTime).getTime();
    const end = start + duration * 1000;
    
    // Calculate offset if serverTime is provided
    let offset = 0;
    if (serverTime) {
      offset = new Date(serverTime).getTime() - Date.now();
    }

    const calculateTime = () => {
      const now = Date.now() + offset; // Adjusted current time
      const remaining = Math.ceil((end - now) / 1000);
      return Math.max(0, remaining);
    };

    setTimeLeft(calculateTime());

    const interval = setInterval(() => {
      const remaining = calculateTime();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return timeLeft;
};
