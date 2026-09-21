import React, { useState, useEffect } from 'react';

export const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsStarted(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isStarted) {
    return (
      <div className="bg-[var(--color-charcoal)] text-[var(--color-cream)] border-[4px] border-[var(--color-orange)] p-8 text-center">
        <h2 className="text-4xl md:text-6xl font-heading font-black text-[var(--color-orange)] animate-pulse">EVENT STARTED</h2>
      </div>
    );
  }

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-4">
      <span className="text-4xl md:text-6xl font-heading font-black text-[var(--color-cream)] tabular-nums">{value.toString().padStart(2, '0')}</span>
      <span className="text-[var(--color-orange)] text-sm md:text-base font-bold uppercase tracking-widest mt-2">{label}</span>
    </div>
  );

  return (
    <div className="bg-[var(--color-charcoal)] border-y-4 border-[var(--color-orange)] py-12">
      <div className="max-w-4xl mx-auto px-4 flex justify-center items-center divide-x divide-[var(--color-charcoal-light)]">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Mins" />
        <TimeBox value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};
