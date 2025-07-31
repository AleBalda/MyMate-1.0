// src/context/PomodoroContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Funzione placeholder per evitare crash se la prop non viene fornita
const dummyTrigger = async (eventType: string) => {
  console.warn(`Funzione di gamification non fornita. Evento ignorato: ${eventType}`);
};

// --- INTERFACCE e TIPI ---
interface PomodoroDurations {
  study: number;
  break: number;
}
interface PomodoroContextType {
  durations: PomodoroDurations;
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

interface PomodoroProviderProps {
  children: ReactNode;
  triggerGamificationEvent?: (eventType: string) => Promise<void>;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider = ({ children, triggerGamificationEvent = dummyTrigger }: PomodoroProviderProps) => {
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [phase, setPhase] = useState<'study' | 'break'>('study');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalCycles, setTotalCycles] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [durations, setDurations] = useState<PomodoroDurations>({ study: 25, break: 5 });

  useEffect(() => {
    if (!isTimerActive || isPaused || secondsLeft < 0) return;

    if (secondsLeft === 0) {
      if (phase === 'study') {
        const completedStudyDuration = durations.study;
        
        if (completedStudyDuration >= 1) {
          console.log(`Sessione di studio di ${completedStudyDuration} min completata. Triggero evento.`);
          triggerGamificationEvent('COMPLETE_POMODORO_1MIN');
        }
        
        setPhase('break');
        setSecondsLeft(durations.break * 60);
      } else {
        if (currentCycle < totalCycles) {
          const nextCycle = currentCycle + 1;
          setCurrentCycle(nextCycle);
          setPhase('study');
          setSecondsLeft(durations.study * 60);
        } else {
          stopTimer();
        }
      }
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isTimerActive, isPaused, phase, currentCycle, totalCycles, durations, triggerGamificationEvent]);
  
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
  
  const value = { durations, isSetupOpen, openSetup, closeSetup, isTimerActive, startTimer, pauseTimer, stopTimer, phase, secondsLeft, totalCycles, currentCycle, isPaused };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};