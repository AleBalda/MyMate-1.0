import React, { useState } from 'react';
import styles from './PomodoroSetupModal.module.css';
import { usePomodoro } from '../../context/PomodoroContext';
import Modal from '../ui/Modal';
import { FiClock, FiCoffee, FiRepeat } from 'react-icons/fi';

const PomodoroSetupModal = () => {
  const { isSetupOpen, closeSetup, startTimer } = usePomodoro();
  const [study, setStudy] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [cycles, setCycles] = useState(4);

  const totalMinutes = (study + breakTime) * cycles;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTimer({ study, break: breakTime, cycles });
  };

  return (
    <Modal isOpen={isSetupOpen} onClose={closeSetup}>
      <div className={styles.container}>
        <h2>Setup Your Focus Session</h2>
        <p>Customize your Pomodoro timer for optimal productivity.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.sliderGroup}>
            <div className={styles.label}>
              <FiClock />
              <span>Focus Time</span>
            </div>
            <input 
              type="range" 
              min="5" max="60" step="5" 
              value={study}
              onChange={(e) => setStudy(Number(e.target.value))}
            />
            <span className={styles.value}>{study} min</span>
          </div>

          <div className={styles.sliderGroup}>
            <div className={styles.label}>
              <FiCoffee />
              <span>Break Time</span>
            </div>
            <input 
              type="range" 
              min="1" max="30" 
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
            />
            <span className={styles.value}>{breakTime} min</span>
          </div>

          <div className={styles.sliderGroup}>
            <div className={styles.label}>
              <FiRepeat />
              <span>Cycles</span>
            </div>
            <input 
              type="range" 
              min="1" max="12" 
              value={cycles}
              onChange={(e) => setCycles(Number(e.target.value))}
            />
            <span className={styles.value}>{cycles} cycles</span>
          </div>
          
          <div className={styles.totalTime}>
            Total session time: <strong>{hours > 0 ? `${hours}h ` : ''}{minutes > 0 ? `${minutes}m` : ''}</strong>
          </div>
          <button type="submit" className={styles.submitButton}>Start Focusing</button>
        </form>
      </div>
    </Modal>
  );
};

export default PomodoroSetupModal;