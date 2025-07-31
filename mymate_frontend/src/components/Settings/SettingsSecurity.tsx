import React from 'react';
import styles from './Settings.module.css';

const SettingsSecurity = () => {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Login Credentials</h2>
        <div className={styles.detailRow}>
          <div>
            <strong>Email Address</strong>
            <p>alex.doe@university.com</p>
          </div>
          <button className={styles.secondaryButton}>Change Email</button>
        </div>
        <div className={styles.detailRow}>
          <div>
            <strong>Password</strong>
            <p>Last changed on 12th Jan 2024</p>
          </div>
          <button className={styles.primaryButton}>Change Password</button>
        </div>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Two-Factor Authentication</h2>
        <div className={styles.toggleRow}>
            <div>
                <strong>Enable Two-Factor Authentication (2FA)</strong>
                <p className={styles.cardDescription}>Add an extra layer of security to your account.</p>
            </div>
            <label className={styles.toggleSwitch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
            </label>
        </div>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Connected Accounts</h2>
        <p className={styles.cardDescription}>No accounts connected.</p>
      </div>
    </>
  );
};
export default SettingsSecurity;