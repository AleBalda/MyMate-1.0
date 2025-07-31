import React, { useState } from 'react';
import QuizSetup from './QuizSetup';
import QuizActive from './QuizActive';
import QuizResults from './QuizResults';
import QuizReview from './QuizReview'; // Importa il nuovo componente di revisione

// Definiamo i tipi (le "forme" dei nostri dati) e li esportiamo
// così altri componenti possono usarli.
export interface QuizConfig {
  numQuestions: number;
  topics: string[];
  questionTypes: string[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
}

// Definiamo i possibili stati del nostro flusso del quiz
type QuizState = 'setup' | 'active' | 'results' | 'review';

const SubjectQuiz = () => {
  // Stato per sapere quale schermata mostrare
  const [quizState, setQuizState] = useState<QuizState>('setup');
  // Stato per salvare la configurazione scelta dall'utente
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  // Stato per salvare il risultato finale
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Funzione per far partire il quiz dalla schermata di setup
  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setQuizState('active');
  };

  // Funzione chiamata quando il quiz attivo finisce
  const handleFinishQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setQuizState('results');
  };

  // Funzione chiamata dalla schermata dei risultati per andare alla revisione
  const handleReviewAnswers = () => {
    setQuizState('review');
  };

  // Funzione per ricominciare l'intero flusso da capo
  const handleRestart = () => {
    setQuizConfig(null);
    setQuizResult(null);
    setQuizState('setup');
  };

  // Switch che decide quale componente renderizzare in base allo stato attuale
  switch (quizState) {
    case 'active':
      // Se lo stato è 'active', mostra il quiz. 
      // Il "!" dice a TypeScript "sono sicuro che config non è null qui"
      return <QuizActive config={quizConfig!} onFinish={handleFinishQuiz} />;
    
    case 'results':
      // Se lo stato è 'results', mostra i risultati
      // e passa le funzioni per ricominciare o per andare alla revisione
      return <QuizResults result={quizResult!} onRestart={handleRestart} onReview={handleReviewAnswers} />;
    
    case 'review':
      // Se lo stato è 'review', mostra la schermata di revisione
      return <QuizReview onRestart={handleRestart} />;

    case 'setup':
    default:
      // In tutti gli altri casi (o all'inizio), mostra la configurazione
      return <QuizSetup onStartQuiz={handleStartQuiz} />;
  }
};

export default SubjectQuiz;