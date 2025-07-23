import React from 'react';
import styles from './Settings.module.css';
import { FiCheck } from 'react-icons/fi';

const SettingsBilling = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.detailRow}>
          <div>
            <h2 className={styles.cardTitleNoMargin}>Your Current Plan</h2>
            <strong>MyMate Pro</strong>
            <p>€12.99 / month</p>
            <small>Next billing date: Oct 23, 2025</small>
          </div>
          <button className={styles.secondaryButton}>Manage Subscription</button>
        </div>
      </div>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Payment Methods</h2>
        <div className={styles.paymentMethod}>
          <div className={styles.cardIcon}>💳</div>
          <div>
            <strong>Visa ending in 4242</strong>
            <p>Expires 12/2028</p>
          </div>
          <div className={styles.paymentActions}>
            <button className={styles.textButton}>Edit</button>
            <button className={`${styles.textButton} ${styles.danger}`}>Remove</button>
          </div>
        </div>
        <button className={styles.addButton}>+ Add New Payment Method</button>
      </div>

      {/* --- SEZIONE MODIFICATA E COMPLETATA --- */}
      <div>
        <h2 className={styles.sectionTitle}>Available Plans</h2>
        <div className={styles.plansGrid}>
          {/* Piano Free */}
          <div className={styles.planCard}>
            <h3>Free</h3>
            <span className={styles.planPrice}>€0<small>/month</small></span>
            <ul className={styles.featuresList}>
              <li><FiCheck /> Limited AI chat</li>
              <li><FiCheck /> Basic quiz generation</li>
              <li><FiCheck /> 1GB file storage</li>
            </ul>
            <button className={styles.secondaryButton} disabled>Current Plan</button>
          </div>
          
          {/* Piano Pro */}
          <div className={`${styles.planCard} ${styles.popular}`}>
            <div className={styles.popularBadge}>POPULAR</div>
            <h3>Pro</h3>
            <span className={styles.planPrice}>€12.99<small>/month</small></span>
            <ul className={styles.featuresList}>
              <li><FiCheck /> Unlimited AI chat & voice</li>
              <li><FiCheck /> Advanced quiz system</li>
              <li><FiCheck /> 100GB file storage</li>
              <li><FiCheck /> Full gamification access</li>
            </ul>
            <button className={styles.primaryButton}>Your Current Plan</button>
          </div>
          
          {/* Piano Ultimate */}
          <div className={styles.planCard}>
            <h3>Ultimate</h3>
            <span className={styles.planPrice}>€19.99<small>/month</small></span>
             <ul className={styles.featuresList}>
              <li><FiCheck /> Everything in Pro</li>
              <li><FiCheck /> Priority AI access</li>
              <li><FiCheck /> Unlimited storage</li>
              <li><FiCheck /> Avatar customization</li>
            </ul>
            <button className={styles.darkButton}>Upgrade Plan</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsBilling;