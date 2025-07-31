// Tuo file StreakModalContent.tsx modificato

import React from 'react';
import styles from './StreakModalContent.module.css';
import { FiGift, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { FaFireAlt } from "react-icons/fa";
import { useUser } from '../../hooks/useUser'; // <-- NOVITÀ: Importa il nuovo hook

const goals = [
  { text: 'Log in to MyMate', completed: true },
  { text: 'Complete one study session', completed: true },
  { text: 'Upload new notes for a subject', completed: false },
];

const StreakModalContent = () => {
  // --- NOVITÀ: Usiamo l'hook per ottenere tutti i dati dell'utente ---
  const { user, isLoading } = useUser();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Progress & Goals</h2>
      <div className={styles.hero}>
        <FaFireAlt className={styles.flameIcon} />
        {/* --- NOVITÀ: Usiamo il valore dello streak che arriva dal backend --- */}
        <span className={styles.streakNumber}>
          {isLoading ? '...' : user?.streak}
        </span>
      </div>
      <p className={styles.motivation}>You're on fire! Keep it up to unlock rewards.</p>
      <div className={styles.nextReward}>
        Keep your streak alive by logging in daily. <br />
        <strong>Next Reward at 7 Days: +50 <FiGift size={14} style={{ verticalAlign: 'middle' }}/></strong>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Daily Goals</button>
        <button className={styles.tab}>Weekly Goals</button>
        <button className={styles.tab}>Exam Goals</button>
      </div>

      <div className={styles.goalsList}>
        {goals.map((goal, index) => (
          <div key={index} className={`${styles.goalItem} ${goal.completed ? styles.completed : ''}`}>
            {goal.completed ? <FiCheckCircle /> : <FiCircle />}
            <span>{goal.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakModalContent;