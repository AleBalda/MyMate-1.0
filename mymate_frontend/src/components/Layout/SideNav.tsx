//`Link` è un componente di React Router che crea link per navigare senza ricaricare la pagina.  
//`NavLink` è simile, ma evidenzia automaticamente il link attivo in base all’URL corrente.  
//Entrambi servono per gestire la navigazione interna in un’app React SPA. Si importano da `react-router-dom`.

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';
import { FiSettings, FiPlusCircle, FiHome } from 'react-icons/fi';

// Dati di esempio (in futuro arriveranno dal backend)
const subjects = [
  { id: 'analisi-matematica-1', name: 'Analisi Matematica I', color: '#8b5cf6' },
  { id: 'diritto-privato', name: 'Diritto Privato', color: '#ec4899' },
  { id: 'diritto-commerciale', name: 'Diritto Commerciale', color: '#f97316' },
  { id: 'statistica-1', name: 'Statistica I', color: '#10b981' },
  { id: 'fisica-generale', name: 'Fisica Generale', color: '#ef4444' },
  { id: 'chimica-inorganica', name: 'Chimica Inorganica', color: '#eab308' },
  { id: 'economia-politica', name: 'Economia Politica', color: '#3b82f6' },
];

// Definiamo le props che il componente si aspetta di ricevere
interface SideNavProps {
  onProfileClick: () => void;
  onAddNewSubjectClick: () => void; // Aggiunta la nuova prop
}

const SideNav: React.FC<SideNavProps> = ({ onProfileClick, onAddNewSubjectClick }) => {
  return (
    <aside className={styles.leftColumn}>
      <Link to="/" className={styles.logo}>MyMate</Link>
      
      <NavLink
        to="/"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        end 
      >
        <FiHome />
        <span>Dashboard</span>
      </NavLink>

      <h2 className={styles.subjectsHeader}>Subjects</h2>
      <ul className={styles.subjectsList}>
        {subjects.map((subject) => (
          <li key={subject.id}>
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
      
      {/* Il pulsante ora chiama la funzione passata come prop */}
      <button className={styles.addNewButton} onClick={onAddNewSubjectClick}>
        <FiPlusCircle />
        <span>Add New Subject</span>
      </button>

      <div className={styles.userProfileContainer}>
        <div className={styles.profileClickableArea} onClick={onProfileClick}>
          <img src="https://i.pravatar.cc/40?u=mario" alt="User Avatar" />
          <span>Mario Rossi</span>
        </div>
        <Link to="/settings" className={styles.settingsLink}>
          <FiSettings size={20} />
        </Link>
      </div>
    </aside>
  );
};

export default SideNav;