import React from 'react';
import styles from './GemsModalContent.module.css';
import { FiGift, FiArrowUpCircle, FiArrowDownCircle, FiCpu, FiClock, FiFeather, FiAward } from 'react-icons/fi';

const GemsModalContent = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Wallet</h2>
      <div className={styles.hero}>
        <FiGift className={styles.gemIcon} />
        <span className={styles.gemNumber}>1,250</span>
      </div>
      <p className={styles.subtitle}>Use your gems to power up your study sessions!</p>

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
            <button>Unlock</button>
          </div>
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