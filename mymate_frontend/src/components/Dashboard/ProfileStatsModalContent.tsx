import React from 'react';
import styles from './ProfileStatsModalContent.module.css';

const ProfileStatsModalContent = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profile & Stats</h2>
      
      <div className={styles.profileHeader}>
        <div className={styles.avatar}></div>
        <div className={styles.profileInfo}>
          <span className={styles.name}>Mario Rossi</span>
          <span className={styles.university}>Università degli Studi di Milano-Bicocca</span>
          <span className={styles.degree}>Ingegneria Informatica</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>27</span>
          <span className={styles.statLabel}>CFU Earned</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>28.5</span>
          <span className={styles.statLabel}>GPA</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Exams Passed</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <h3 className={styles.progressTitle}>Degree Progress</h3>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: '15%' }}></div>
        </div>
        <div className={styles.progressLabels}>
          <span>27 / 180 CFU</span>
          <span>15% Complete</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsModalContent;