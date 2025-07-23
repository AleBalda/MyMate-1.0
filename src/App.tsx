import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SubjectEnvironmentPage from './pages/SubjectEnvironmentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* --- NUOVA ROTTA DINAMICA --- */}
        <Route path="/subject/:subjectId" element={<SubjectEnvironmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;