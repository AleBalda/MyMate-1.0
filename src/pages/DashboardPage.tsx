import React, { useState } from 'react';
import styles from './DashboardPage.module.css';
import { FiMic, FiPaperclip, FiAlertCircle, FiGift, FiCheckCircle, FiCircle, FiCalendar } from 'react-icons/fi';
import avatarImg from '../assets/aavatar.png';

// --- PERCORSI ---
import Modal from '../components/ui/Modal'; 
import StreakModalContent from '../components/Dashboard/StreakModalContent';
import GemsModalContent from '../components/Dashboard/GemsModalContent';
import ProfileStatsModalContent from '../components/Dashboard/ProfileStatsModalContent';
import SideNav from '../components/Layout/SideNav';

const calendarEvents = [
  { day: '31', month: 'MAY', title: 'Exam: Analisi I', details: 'Aula 1, Building A' },
  { day: '1', month: 'JUN', title: 'Submit: Essay', details: 'Diritto Privato' },
  { day: '3', month: 'JUN', title: 'Group Meeting', details: 'Project Statistica I' },
];

const goals = [
  { text: 'Log in to MyMate', completed: true },
  { text: 'Complete one study session', completed: true },
  { text: 'Upload new notes for a subject', completed: false },
];

const DashboardPage = () => {
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isGemsModalOpen, setIsGemsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <div className={styles.dashboardGrid}>
        <SideNav />
        <main className={styles.centerColumn}>
          <img src={avatarImg} alt="AI Avatar" className={styles.avatar} />
          <h1 className={styles.welcomeMessage}>Ciao Mario, pronto a spaccare oggi?</h1>
          <div className={styles.commandBar}>
            <input type="text" placeholder="Chiedimi qualsiasi cosa..." />
            <FiMic size={20} />
            <FiPaperclip size={20} />
          </div>
          <div className={styles.focusCard}>
            <div className={styles.focusContent}>
              <FiAlertCircle />
              <div className={styles.focusText}>
                <strong>Today's Focus</strong>
                <span>Deadline approaching: Analisi I</span>
              </div>
            </div>
            <button>Start Studying</button>
          </div>
        </main>

        <aside className={styles.rightColumn}>
          <div className={styles.widgetCard}>
            <h3>Academic Calendar</h3>
            {calendarEvents.map((event, index) => (
              <div key={index} className={styles.calendarEvent}>
                <div className={styles.calendarDate}>
                  <div>{event.day}</div>
                  <div>{event.month}</div>
                </div>
                <div className={styles.calendarLine} />
                <div className={styles.calendarDetails}>
                  <strong>{event.title}</strong>
                  <span>{event.details}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.widgetCard}>
            <h3>Your Progress</h3>
            <div className={styles.progressItem} onClick={() => setIsStreakModalOpen(true)} style={{cursor: 'pointer'}}>
              <FiCalendar />
              <span>Daily Streak</span>
              <span className={styles.value}>5 Days</span>
            </div>
            <div className={styles.progressItem} onClick={() => setIsGemsModalOpen(true)} style={{cursor: 'pointer'}}>
              <FiGift />
              <span>Virtual Currency</span>
              <span className={styles.value}>1,250</span>
            </div>
          </div>
          <div className={styles.widgetCard}>
            <h3>Today's Goals</h3>
            {goals.map((goal, index) => (
              <div key={index} className={`${styles.goalItem} ${goal.completed ? styles.completed : ''}`}>
                {goal.completed ? <FiCheckCircle /> : <FiCircle />}
                <span>{goal.text}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <Modal isOpen={isStreakModalOpen} onClose={() => setIsStreakModalOpen(false)}>
        <StreakModalContent />
      </Modal>
      <Modal isOpen={isGemsModalOpen} onClose={() => setIsGemsModalOpen(false)}>
        <GemsModalContent />
      </Modal>
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <ProfileStatsModalContent />
      </Modal>
    </>
  );
};

export default DashboardPage;