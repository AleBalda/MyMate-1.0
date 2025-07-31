import React from 'react';
import styles from './Settings.module.css';
import { FiGrid, FiCalendar, FiMail } from 'react-icons/fi';

const SettingsIntegrations = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Integrations</h2>
      <p className={styles.cardDescription}>Connect MyMate with your favorite apps to streamline your workflow.</p>
      <ul className={styles.integrationList}>
        <li className={styles.integrationRow}>
          <div className={styles.integrationInfo}>
            <FiGrid size={20}/>
            <div>
              <strong>Productivity Platform</strong>
              <p>Integrate with your platform to import your notes.</p>
            </div>
          </div>
          <button className={styles.primaryButton}>Connect</button>
        </li>
        <li className={styles.integrationRow}>
          <div className={styles.integrationInfo}>
            <FiCalendar size={20}/>
            <div>
              <strong>Calendar</strong>
              <p>Connect your calendar to sync your academic schedule.</p>
            </div>
          </div>
          <label className={styles.toggleSwitch}>
            <input type="checkbox" defaultChecked/>
            <span className={styles.slider}></span>
          </label>
        </li>
         <li className={styles.integrationRow}>
          <div className={styles.integrationInfo}>
            <FiMail size={20}/>
            <div>
              <strong>Email Client</strong>
              <p>Connect your email to get important notifications directly.</p>
            </div>
          </div>
          <button className={styles.secondaryButton}>Connect</button>
        </li>
      </ul>
    </div>
  );
};
export default SettingsIntegrations;