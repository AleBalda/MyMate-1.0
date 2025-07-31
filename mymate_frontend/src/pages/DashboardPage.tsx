// Tuo file DashboardPage.tsx - Aggiornato con la logica dei Goals

import React, { useState } from 'react';
import styles from './DashboardPage.module.css';
import { FiMic, FiPaperclip, FiAlertCircle, FiGift, FiCheckCircle, FiCircle, FiAward} from 'react-icons/fi'; 
import avatarImg from '../assets/aavatar.png';
import { Link } from 'react-router-dom';
import Modal from '../components/ui/Modal'; 
import StreakModalContent from '../components/Dashboard/StreakModalContent';
import GemsModalContent from '../components/Dashboard/GemsModalContent';
import ProfileStatsModalContent from '../components/Dashboard/ProfileStatsModalContent';
import SideNav from '../components/Layout/SideNav';
import { LiaGemSolid } from "react-icons/lia";
// --- AGGIUNTA 1: Importiamo il nuovo componente per la modale ---
import AddNewSubjectModal from '../components/Layout/AddNewSubjectModal';

// ---- MODIFICA 1: Importiamo l'hook per i dati utente ----
import { useUser } from '../hooks/useUser'; // Assicurati che il percorso sia corretto

// Manteniamo la lista statica del calendario
const calendarEvents = [
  { day: '31', month: 'MAY', title: 'Exam: Analisi I', details: 'Aula 1, Building A' },
  { day: '1', month: 'JUN', title: 'Submit: Essay', details: 'Diritto Privato' },
  { day: '3', month: 'JUN', title: 'Group Meeting', details: 'Project Statistica I' },
];

const DashboardPage = () => {
  // Manteniamo la gestione dello stato delle modali
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isGemsModalOpen, setIsGemsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // --- AGGIUNTA 2: Aggiungiamo lo stato per la nuova modale ---
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);

  // ---- MODIFICA 3: Usiamo l'hook per ottenere i dati dinamici ----
  const { user, isLoading } = useUser();

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  // --- AGGIUNTA 3: Creiamo la funzione per aprire la nuova modale ---
  const handleAddNewSubjectClick = () => {
    setIsAddSubjectModalOpen(true);
  };

  return (
    <>
      <div className={styles.dashboardGrid}>
        {/* Passiamo entrambe le funzioni come prop a SideNav */}
        <SideNav 
          onProfileClick={handleProfileClick} 
          onAddNewSubjectClick={handleAddNewSubjectClick} 
        />

        <main className={styles.centerColumn}>
          {/* Questa sezione rimane invariata */}
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
          {/* Il widget del calendario rimane invariato */}
          <Link to="/calendar" className={styles.widgetLink}>
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
          </Link>
          
          {/* Il widget del progresso ora usa i dati dinamici dall'hook */}
          <div className={styles.widgetCard}>
            <h3>Your Progress</h3>
            <div className={styles.progressItem} onClick={() => setIsStreakModalOpen(true)} style={{cursor: 'pointer'}}>
              <FiAward color='var(--primary-blue)' />
              <span>Daily Streak</span>
              <span className={styles.value}>{isLoading ? '...' : `${user?.streak} Days`}</span>
            </div>
            <div className={styles.progressItem} onClick={() => setIsGemsModalOpen(true)} style={{cursor: 'pointer'}}>
              <LiaGemSolid color='var(--primary-blue)' />
              <span>Virtual Currency</span>
              <span className={styles.value}>{isLoading ? '...' : user?.gems.toLocaleString('it-IT')}</span>
            </div>
          </div>

          {/* ---- MODIFICA 4: Il widget degli obiettivi ora è completamente dinamico ---- */}
          <div className={styles.widgetCard}>
            <h3>Today's Goals</h3>
            {isLoading ? (
              <p>Caricamento...</p>
            ) : (
              // Usiamo i dati 'daily_goals' che arrivano dall'hook 'user'
              user?.daily_goals.map((goal) => (
                <div key={goal.id} className={`${styles.goalItem} ${goal.completed ? styles.completed : ''}`}>
                  {goal.completed ? <FiCheckCircle /> : <FiCircle />}
                  <span>{goal.text}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {/* Le modali esistenti rimangono invariate */}
      <Modal isOpen={isStreakModalOpen} onClose={() => setIsStreakModalOpen(false)}>
        <StreakModalContent />
      </Modal>

      <Modal isOpen={isGemsModalOpen} onClose={() => setIsGemsModalOpen(false)}>
        <GemsModalContent />
      </Modal>

      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <ProfileStatsModalContent />
      </Modal>

      {/* --- AGGIUNTA 4: Renderizziamo la nuova modale --- */}
      <Modal isOpen={isAddSubjectModalOpen} onClose={() => setIsAddSubjectModalOpen(false)}>
        <AddNewSubjectModal />
      </Modal>
    </>
  );
};

export default DashboardPage;