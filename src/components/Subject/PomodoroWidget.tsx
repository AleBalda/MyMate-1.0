import React from 'react';
import styles from './PomodoroWidget.module.css';
import { FiClock } from 'react-icons/fi';

const PomodoroWidget = () => {
  return (
    <div className={styles.widget}>
      <FiClock size={18} />
      <span>24:17</span>
    </div>
  );
};

export default PomodoroWidget;