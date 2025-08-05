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


import { useUser } from './hooks/useUser';

import './App.css';


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

      <AppContent />
    </BrowserRouter>
  );
}

export default App;