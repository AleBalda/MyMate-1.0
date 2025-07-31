// BrowserRouter: Componente di React Router che gestisce il routing tramite l'HTML5 history API, permettendo la navigazione senza ricaricare la pagina.
// Routes: Contenitore delle route che renderizza il primo Route corrispondente all'URL attuale.
// Route: Componente figlio di Routes, definisce il percorso e il componente da mostrare quando l'URL corrisponde.

// Tuo file App.tsx corretto e aggiornato

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SubjectEnvironmentPage from './pages/SubjectEnvironmentPage';
import CalendarPage from './pages/CalendarPage';
import { PomodoroProvider } from './context/PomodoroContext';
import PomodoroSetupModal from './components/Subject/PomodoroSetupModal';

// ---- MODIFICA 1: Importiamo l'hook per la logica utente ----
import { useUser } from './hooks/useUser';

import './App.css';

// ---- MODIFICA 2: Creiamo un componente "ponte" ----
// Questo componente esiste solo per poter usare l'hook 'useUser' e passare
// la sua funzione al 'PomodoroProvider' che si trova al suo interno.
const AppContent = () => {
  // Otteniamo la funzione stabile dal nostro hook
  const { triggerGamificationEvent } = useUser();

  return (
    // Passiamo la funzione al provider come prop
    <PomodoroProvider triggerGamificationEvent={triggerGamificationEvent}>
      <PomodoroSetupModal />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/subject/:subjectId" element={<SubjectEnvironmentPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </PomodoroProvider>
  );
};


function App() {
  return (
    <BrowserRouter>
      {/* ---- MODIFICA 3: Usiamo il nuovo componente ponte ---- */}
      {/* Non possiamo usare 'useUser' direttamente qui perché è fuori
          dal contesto di un componente che lo fornisce. Invece, usiamo
          AppContent che fa da intermediario. */}
      {/* Nota: Se avessi un UserProvider, lo metteresti qui attorno ad AppContent.
          Ma con la nostra struttura attuale, va bene così. */}
      <AppContent />
    </BrowserRouter>
  );
}

export default App;