// Il tuo file GemsModalContent.tsx CORRETTO

import React from 'react';
import styles from './GemsModalContent.module.css';
import { FiGift, FiArrowUpCircle, FiArrowDownCircle, FiCpu, FiClock, FiFeather, FiAward } from 'react-icons/fi';
import { useGems } from '../../hooks/useGems'; // Il percorso corretto

const GemsModalContent = () => {
  // ---- MODIFICA 1: Usiamo il nome della nuova funzione generica ----
  const { gems, triggerGamificationEvent, isLoading } = useGems();

  const handleUnlockClick = () => {
    // ---- MODIFICA 2: Chiamiamo l'evento specifico definito nel backend ----
    triggerGamificationEvent('TEST_ADD_GEMS'); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Wallet</h2>
      <div className={styles.hero}>
        <FiGift className={styles.gemIcon} />
        <span className={styles.gemNumber}>
          {isLoading ? '...' : gems.toLocaleString('it-IT')}
        </span>
      </div>
      <p className={styles.subtitle}>Use your gems to power up your study sessions!</p>

      {/* Il resto del componente non cambia */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        <ul className={styles.activityList}>
          <li><FiArrowUpCircle className={styles.plus} /> Daily goal completed <span>+10 <FiGift size={12} style={{ verticalAlign: 'middle' }}/></span></li>
          <li><FiArrowDownCircle className={styles.minus} /> Unlocked extra quiz <span>-50 <FiGift size={12} style={{ verticalAlign: 'middle' }}/></span></li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Spend Your Gems</h3>
        <div className={styles.storeGrid}>
          <div className={styles.storeItem}>
            <FiCpu size={24} />
            <span>Extra Quiz</span>
            <small>Cost: 75 <FiGift size={12}/></small>
            <button onClick={handleUnlockClick}>Unlock (+10 per test)</button>
          </div>
          {/* ...gli altri bottoni... */}
          <div className={styles.storeItem}>
            <FiClock size={24} />
            <span>Avatar Time Boost</span>
            <small>Cost: 75 <FiGift size={12}/></small>
            <button>Unlock</button>
          </div>
          <div className={styles.storeItem}>
            <FiFeather size={24} />
            <span>Custom Theme</span>
            <small>Cost: 150 <FiGift size={12}/></small>
            <button>Unlock</button>
          </div>
          <div className={styles.storeItem}>
            <FiAward size={24} />
            <span>Extra Pomodoro</span>
            <small>Cost: 25 <FiGift size={12}/></small>
            <button>Unlock</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemsModalContent;