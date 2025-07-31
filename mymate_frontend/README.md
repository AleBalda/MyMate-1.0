# MyMate - Documentazione Frontend

Questo documento descrive l'architettura, la struttura dei file e il flusso logico del frontend dell'applicazione MyMate, sviluppata in React con TypeScript e Vite.

---

## 1. Stack Tecnologico Principale

- **Framework:** React 18+
- **Linguaggio:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules (`.module.css`)
- **Routing:** React Router DOM
- **Librerie UI:** React Icons

---

## 2. Struttura delle Cartelle

Il progetto è organizzato per funzionalità, per garantire scalabilità e manutenibilità.

/src
├── assets/ # Immagini, SVG e altre risorse statiche
├── components/ # Componenti React riutilizzabili
│ ├── Dashboard/ # Componenti specifici per le modali della Dashboard
│ ├── Layout/ # Componenti strutturali (es. SideNav)
│ ├── Settings/ # Componenti per le varie sezioni delle Impostazioni
│ ├── Subject/ # Componenti usati nell'ambiente di una materia (es. Quiz, Files)
│ └── ui/ # Componenti UI generici e di base (es. Modal)
│
├── context/ # React Context per la gestione dello stato globale
│ └── PomodoroContext.tsx
│
├── pages/ # Componenti di alto livello che rappresentano intere pagine/rotte
│ ├── DashboardPage.tsx
│ ├── SettingsPage.tsx
│ └── (etc.)
│
├── App.tsx # Componente radice che gestisce il routing
├── main.tsx # Punto di ingresso dell'applicazione
└── index.css # Stili globali e variabili CSS


---

## 3. Flusso di Avvio e File Principali

L'applicazione segue un flusso di avvio standard per un progetto Vite + React.

1.  **`index.html` (nella root):** È la pagina HTML di base che viene servita al browser. Contiene un `<div id="root"></div>` dove verrà "montata" l'intera applicazione React.

2.  **`src/main.tsx`:** Questo è il **punto di ingresso** del codice JavaScript/TypeScript. Il suo unico compito è trovare il `<div id="root">` e dire a React di renderizzare il nostro componente principale, `<App />`, al suo interno.

3.  **`src/App.tsx`:** Questo è il **componente radice** dell'applicazione. Non contiene UI visibile, ma agisce come un "controllore del traffico". Il suo ruolo è:
    -   Impostare il **`BrowserRouter`** per abilitare la navigazione tra le pagine.
    -   Definire le **`Routes`**, ovvero le "strade" dell'app. Associa un URL (es. `/settings`) a un componente di pagina (es. `<SettingsPage />`).
    -   Avvolgere l'intera applicazione nei **Provider di Contesto Globale** (come `PomodoroProvider`), rendendo lo stato condiviso accessibile a tutti i componenti figli.

4.  **`src/index.css`:** Contiene gli stili globali che si applicano a tutta l'applicazione, come il reset dei margini, i font di base e, soprattutto, le **variabili CSS** (`:root { ... }`) che definiscono la nostra palette di colori, garantendo coerenza visiva.

---

## 4. Architettura dei Componenti e Flusso dei Dati

L'applicazione è costruita seguendo una chiara architettura a componenti, dove ogni pezzo ha una responsabilità specifica.

### a) Navigazione e Layout

-   **`<SideNav />` (`components/Layout/`):** La barra di navigazione sinistra. È un componente "intelligente" che usa `NavLink` da `react-router-dom` per evidenziare la pagina o la materia attiva. Viene renderizzato all'interno di ogni pagina principale (`DashboardPage`, `SubjectEnvironmentPage`, etc.) per fornire una navigazione coerente.

### b) Pagine Principali (`pages/`)

-   **`<DashboardPage />`:** La pagina principale. È un componente complesso che assembla vari widget e gestisce lo stato di apertura/chiusura delle sue modali (`useState`).
-   **`<SubjectEnvironmentPage />`:** Il cuore dell'app. È un componente "dinamico" che usa l'hook `useParams` per leggere l'ID della materia dall'URL. Gestisce lo stato della tab attiva (`Chat`, `Files`, etc.) e renderizza il componente figlio corretto.
-   **`<SettingsPage />`:** Pagina dedicata alle impostazioni. Gestisce la navigazione interna tra le sue sezioni (Profilo, Billing, etc.) e renderizza i componenti di contenuto corrispondenti.

### c) Gestione dello Stato Globale (`context/`)

-   **`<PomodoroContext />`:** Un esempio di stato globale. Usa il Context API di React per gestire la logica del timer Pomodoro. In questo modo, il timer può essere avviato da una pagina (`SubjectEnvironmentPage`) e il suo stato (tempo rimanente, fase) può essere visualizzato ovunque, anche se l'utente cambia pagina, senza che il timer si interrompa. Il `PomodoroProvider` in `App.tsx` rende questo stato accessibile a tutta l'app.

### d) Flusso di un'Interazione Tipica (Apertura Modale)

1.  L'utente clicca su un elemento in un widget della **`<DashboardPage />`** (es. "Daily Streak").
2.  L'evento `onClick` chiama una funzione `setIsStreakModalOpen(true)`.
3.  Lo stato della pagina cambia, causando un nuovo render.
4.  Durante il nuovo render, il componente `<Modal isOpen={isStreakModalOpen} ...>` riceve `isOpen={true}`.
5.  Il componente **`<Modal />`** (`components/ui/`), che è un contenitore generico, ora si mostra a schermo.
6.  Al suo interno, viene renderizzato il contenuto specifico, **`<StreakModalContent />`** (`components/Dashboard/`), che contiene la UI della modale.
7.  Quando l'utente chiude la modale (cliccando la 'X' o l'overlay), viene chiamata la funzione `onClose`, che a sua volta esegue `setIsStreakModalOpen(false)`, nascondendo di nuovo la modale.

---
---
## GESTIONE FUNZIONALITA' GEMME

1. Registra il Nuovo Evento nella "Centralina" (Backend)
Apri il file del backend: mymate1.0-backend/main.py.
Trova il dizionario GAMIFICATION_EVENTS. Questo è il cuore del nostro motore.
Aggiungi una nuova riga al dizionario. Segui queste convenzioni:
Nome Evento: In MAIUSCOLO_CON_UNDERSCORE per chiarezza.
Valore Gemme: Un numero intero.
Positivo per una ricompensa (es. 25).
Negativo per un costo (es. -50).

Esempio: Vogliamo dare 25 gemme per il completamento di una sessione Pomodoro.

# mymate1.0-backend/main.py

GAMIFICATION_EVENTS = {
    'TEST_ADD_GEMS': 10,
    'UNLOCK_EXTRA_QUIZ': -75,
    'DAILY_LOGIN': 5,
    'FAILED_QUIZ': -2,
    'COMPLETE_POMODORO': 25,  # <-- NUOVA RIGA AGGIUNTA!
}

Salva il file. Il server uvicorn si riavvierà automaticamente, caricando la nuova regola. Il backend ora "conosce" questo nuovo evento.

2. "Innesca" l'Evento dal Frontend
Ora dobbiamo dire al frontend di notificare il backend quando l'azione avviene.
Apri il file del componente React (.tsx) dove si trova la logica per l'azione che vuoi premiare (es. PomodoroTimer.tsx).
Importa e attiva il nostro hook personalizzato useGems all'inizio del tuo componente:

import { useGems } from '../../hooks/useGems'; // Adatta il percorso se necessario
Const TuoComponente = () => {
  const { triggerGamificationEvent } = useGems();
  // ... resto del tuo codice

Trova la funzione che viene eseguita quando l'azione ha successo (es. handlePomodoroComplete).
All'interno di quella funzione, aggiungi la chiamata a triggerGamificationEvent, passando come stringa il nome esatto dell'evento che hai definito nel backend.

Esempio:

// Dentro il tuo componente PomodoroTimer.tsx

const handlePomodoroComplete = () => {
  // ...qualsiasi logica che già esiste per completare il timer...
  console.log("Sessione Pomodoro completata!");

  // Notifica il backend per assegnare la ricompensa
  triggerGamificationEvent('COMPLETE_POMODORO'); 
};

return (
  <button onClick={handlePomodoroComplete}>Completa Sessione</button>
);

Salva il file. Il frontend si aggiornerà automaticamente.







## Informazioni Tecniche (da Template Vite)

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules. For more information, please refer to the official Vite and ESLint documentation.