import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SettingsPage.module.css';
import { FiArrowLeft, FiUser, FiShield, FiCreditCard, FiZap } from 'react-icons/fi';

// Importa i componenti del contenuto
import SettingsProfile from '../components/Settings/SettingsProfile';
import SettingsSecurity from '../components/Settings/SettingsSecurity';
import SettingsBilling from '../components/Settings/SettingsBilling';
import SettingsIntegrations from '../components/Settings/SettingsIntegrations';

// Definisce i tipi per le schede attive
type SettingsTab = 'profile' | 'security' | 'billing' | 'integrations';

const SettingsPage = () => {
  // Stato per tenere traccia della scheda attiva
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  // Funzione per renderizzare il componente giusto in base alla scheda attiva
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <SettingsProfile />;
      case 'security':
        return <SettingsSecurity />;
      case 'billing':
        return <SettingsBilling />;
      case 'integrations':
        return <SettingsIntegrations />;
      default:
        return <SettingsProfile />;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Link to="/" className={styles.backLink}>
        <FiArrowLeft />
        <span>Back to Dashboard</span>
      </Link>
      <div className={styles.settingsGrid}>
        <aside className={styles.settingsNav}>
          <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? styles.active : ''}>
            <FiUser /> Profile
          </button>
          <button onClick={() => setActiveTab('security')} className={activeTab === 'security' ? styles.active : ''}>
            <FiShield /> Account & Security
          </button>
          <button onClick={() => setActiveTab('billing')} className={activeTab === 'billing' ? styles.active : ''}>
            <FiCreditCard /> Plan & Billing
          </button>
          <button onClick={() => setActiveTab('integrations')} className={activeTab === 'integrations' ? styles.active : ''}>
            <FiZap /> Integrations
          </button>
        </aside>
        
        {/*
          STRUTTURA CORRETTA:
          Il contenuto è avvolto da un <main> che funge da seconda colonna della griglia.
          Questo permette all'intera pagina di scrollare, mentre l'aside con la classe .settingsNav
          (che ha "position: sticky") rimane fisso.
        */}
        <main className={styles.settingsContent}>
          {renderContent()}
        </main>
        
      </div>
    </div>
  );
};

export default SettingsPage;