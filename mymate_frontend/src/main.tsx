import { StrictMode } from 'react' // Importa StrictMode per evidenziare potenziali problemi nell'applicazione React
import { createRoot } from 'react-dom/client' // Importa createRoot per creare il root del DOM in React 18
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
