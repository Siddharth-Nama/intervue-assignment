import { useState, useEffect } from 'react';

export const usePollTimer = (startTime: string | Date, duration: number) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!startTime) return;

    const start = new Date(startTime).getTime();
    const end = start + duration * 1000;

    const calculateTime = () => {
      const now = Date.now(); // Ideally synced with server time offset
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
