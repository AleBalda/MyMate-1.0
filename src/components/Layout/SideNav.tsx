import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';
import { FiSettings, FiPlusCircle, FiHome } from 'react-icons/fi';

// Dati di esempio che in futuro arriveranno dal backend
const subjects = [
  { id: 'analisi-matematica-1', name: 'Analisi Matematica I', color: '#8b5cf6' },
  { id: 'diritto-privato', name: 'Diritto Privato', color: '#ec4899' },
  { id: 'diritto-commerciale', name: 'Diritto Commerciale', color: '#f97316' },
  { id: 'statistica-1', name: 'Statistica I', color: '#10b981' },
  { id: 'fisica-generale', name: 'Fisica Generale', color: '#ef4444' },
  { id: 'chimica-inorganica', name: 'Chimica Inorganica', color: '#eab308' },
  { id: 'economia-politica', name: 'Economia Politica', color: '#3b82f6' },
];

const SideNav = () => {
  return (
    <aside className={styles.leftColumn}>
      <Link to="/" className={styles.logo}>MyMate</Link>
      
      {/* Link esplicito per tornare alla Dashboard */}
      <NavLink
        to="/"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        end // L'attributo 'end' assicura che questo link sia attivo SOLO per la rotta esatta "/"
      >
        <FiHome />
        <span>Dashboard</span>
      </NavLink>

      {/* Separatore visivo per una migliore organizzazione */}
      <div className={styles.separator}></div> 

      <h2 className={styles.subjectsHeader}>Subjects</h2>
      <ul className={styles.subjectsList}>
        {subjects.map((subject) => (
          <li key={subject.id}>
            {/* NavLink per ogni materia */}
            <NavLink
              to={`/subject/${subject.id}`}
              className={({ isActive }) => `${styles.subjectItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.subjectDot} style={{ backgroundColor: subject.color }}></span>
              {subject.name}
            </NavLink>
          </li>
        ))}
      </ul>
      
      {/* Pulsante per aggiungere una nuova materia */}
      <button className={styles.addNewButton}>
        <FiPlusCircle />
        <span>Add New Subject</span>
      </button>

      {/* Link al profilo utente e alle impostazioni */}
      <Link to="/settings" className={styles.userProfileLink}>
        <div className={styles.userProfile}>
          <img src="https://i.pravatar.cc/40?u=mario" alt="User Avatar" />
          <span>Mario Rossi</span>
          <FiSettings className={styles.settingsIcon} size={20} />
        </div>
      </Link>
    </aside>
  );
};

export default SideNav;