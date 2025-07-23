import React from 'react';
import styles from './Settings.module.css';

const SettingsProfile = () => {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>User Information</h2>
        <div className={styles.profileLayout}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarPlaceholder}></div>
            <button className={styles.textButton}>Change</button>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input type="text" defaultValue="Alex" />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input type="text" defaultValue="Doe" />
            </div>
            <div className={styles.formGroupFull}>
              <label>Username</label>
              <input type="text" defaultValue="alexdoe" />
            </div>
            <div className={styles.formGroup}>
              <label>University</label>
              <input type="text" defaultValue="University of Example" />
            </div>
            <div className={styles.formGroup}>
              <label>Degree Program</label>
              <input type="text" defaultValue="Computer Science" />
            </div>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <button className={styles.primaryButton}>Save Changes</button>
        </div>
      </div>

      {/* --- SEZIONE MODIFICATA E COMPLETATA --- */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Account Details</h2>
        <div className={styles.detailRow}>
          <div>
            <strong>Email Address</strong>
            <p>alex.doe@university.com</p>
          </div>
          {/* Questo elemento non ha un pulsante a destra, quindi è completo */}
        </div>
        <div className={styles.detailRow}>
           <div>
            <strong>Password</strong>
            <p>••••••••••••</p>
          </div>
          <button className={styles.secondaryButton}>Change Password</button>
        </div>
        {/* --- PARTE AGGIUNTA --- */}
        <div className={styles.detailRow}>
           <div>
            <strong>Delete Account</strong>
            <p>Permanently delete your account and all of your data.</p>
          </div>
          <button className={`${styles.primaryButton} ${styles.dangerButton}`}>Delete Account</button>
        </div>
      </div>
    </>
  );
};

export default SettingsProfile;