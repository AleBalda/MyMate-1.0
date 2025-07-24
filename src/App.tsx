import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PomodoroProvider } from './context/PomodoroContext';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SubjectEnvironmentPage from './pages/SubjectEnvironmentPage';
import CalendarPage from './pages/CalendarPage';
import PomodoroSetupModal from './components/Subject/PomodoroSetupModal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Il Provider avvolge tutto, rendendo il timer accessibile ovunque */}
      <PomodoroProvider>
        
        {/* Questi componenti sono "globali" e fluttuano sopra le pagine */}
        <PomodoroSetupModal />

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/subject/:subjectId" element={<SubjectEnvironmentPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>

      </PomodoroProvider>
    </BrowserRouter>
  );
}

export default App;