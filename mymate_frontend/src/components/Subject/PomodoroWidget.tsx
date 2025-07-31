//Questo file è l'interfaccia principale con cui l'utente interagisce una volta che il timer è partito.

import React from 'react';
import styles from './PomodoroWidget.module.css';
import { FiClock, FiPlay, FiPause, FiSquare } from 'react-icons/fi';
import { usePomodoro } from '../../context/PomodoroContext';

const PomodoroWidget = () => {
  const { 
    durations, // <-- 1. PRENDIAMO LE DURATE REALI
    isTimerActive, 
    phase, 
    secondsLeft, 
    currentCycle, 
    totalCycles,
    isPaused,
    openSetup, 
    pauseTimer,
    stopTimer
  } = usePomodoro();

  if (!isTimerActive) {
    return (
      <button className={styles.widgetButton} onClick={openSetup} title="Start Pomodoro Timer">
        <FiClock size={18} />
        <span>Start Timer</span>
      </button>
    );
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // --- 2. CALCOLO CORRETTO DEL PROGRESSO ---
  // Selezioniamo la durata totale del ciclo corrente in secondi
  const totalDurationInSeconds = phase === 'study' 
    ? durations.study * 60
    : durations.break * 60;
  
  // Calcoliamo la percentuale di tempo TRASCORSO
  const progressPercentage = ((totalDurationInSeconds - secondsLeft) / totalDurationInSeconds) * 100;


  return (
    <div className={`${styles.activeTimer} ${phase === 'study' ? styles.study : styles.break}`}>
      <div className={styles.progressCircle}>
        <svg viewBox="0 0 36 36">
          <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          {/* --- 3. USIAMO LA PERCENTUALE CORRETTA --- */}
          <path className={styles.circle}
            strokeDasharray={`${progressPercentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
      <div className={styles.timerInfo}>
        <span className={styles.phase}>{phase === 'study' ? `Focus (${currentCycle}/${totalCycles})` : 'Break'}</span>
        <span className={styles.time}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div className={styles.controls}>
        <button onClick={pauseTimer}>{isPaused ? <FiPlay/> : <FiPause/>}</button>
        <button onClick={stopTimer}><FiSquare/></button>
      </div>
    </div>
  );
};

export default PomodoroWidget;