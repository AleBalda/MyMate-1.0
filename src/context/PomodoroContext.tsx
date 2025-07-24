import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// --- MODIFICATO: Aggiunta 'durations' al tipo del contesto ---
interface PomodoroContextType {
  durations: { study: number; break: number }; // Durate in minuti
  isSetupOpen: boolean;
  isTimerActive: boolean;
  phase: 'study' | 'break';
  secondsLeft: number;
  totalCycles: number;
  currentCycle: number;
  isPaused: boolean;
  openSetup: () => void;
  closeSetup: () => void;
  startTimer: (config: { study: number; break: number; cycles: number }) => void;
  pauseTimer: () => void;
  stopTimer: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState<'study' | 'break'>('study');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [durations, setDurations] = useState({ study: 25, break: 5 });

  useEffect(() => {
    if (!isTimerActive || isPaused || secondsLeft < 0) return;

    if (secondsLeft === 0) {
      if (phase === 'study') {
        setPhase('break');
        setSecondsLeft(durations.break * 60);
      } else {
        if (currentCycle < totalCycles) {
          setCurrentCycle(currentCycle + 1);
          setPhase('study');
          setSecondsLeft(durations.study * 60);
        } else {
          stopTimer();
          return;
        }
      }
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isTimerActive, isPaused, phase, currentCycle, totalCycles, durations]);
  
  const startTimer = (config: { study: number; break: number; cycles: number }) => {
    setDurations({ study: config.study, break: config.break });
    setTotalCycles(config.cycles);
    setCurrentCycle(1);
    setSecondsLeft(config.study * 60);
    setPhase('study');
    setIsTimerActive(true);
    setIsPaused(false);
    setIsSetupOpen(false);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setIsPaused(false);
    setCurrentCycle(0);
    setSecondsLeft(0);
  };

  const pauseTimer = () => setIsPaused(!isPaused);
  const openSetup = () => setIsSetupOpen(true);
  const closeSetup = () => setIsSetupOpen(false);
  
  // --- MODIFICATO: Aggiunto 'durations' all'oggetto 'value' ---
  const value = {
    durations,
    isSetupOpen, openSetup, closeSetup,
    isTimerActive, startTimer, pauseTimer, stopTimer,
    phase, secondsLeft, totalCycles, currentCycle, isPaused
  };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};