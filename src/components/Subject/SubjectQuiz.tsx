import React, { useState } from 'react';
import QuizSetup from './QuizSetup';
import QuizActive from './QuizActive';
import QuizResults from './QuizResults';

// Definiamo i tipi (le "forme" dei nostri dati) e li esportiamo
export interface QuizConfig {
  numQuestions: number;
  topics: string[];
  questionTypes: string[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
}

// Definiamo i possibili stati del nostro quiz
type QuizState = 'setup' | 'active' | 'results';

const SubjectQuiz = () => {
  // Stato per sapere quale schermata mostrare
  const [quizState, setQuizState] = useState<QuizState>('setup');
  // Stato per salvare la configurazione scelta dall'utente
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  // Stato per salvare il risultato finale
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Funzione per far partire il quiz
  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setQuizState('active');
  };

  // Funzione per terminare il quiz e mostrare i risultati
  const handleFinishQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setQuizState('results');
  };

  // Funzione per ricominciare da capo
  const handleRestart = () => {
    setQuizConfig(null);
    setQuizResult(null);
    setQuizState('setup');
  };

  // Mostra il componente giusto in base allo stato attuale
  switch (quizState) {
    case 'active':
      // Se lo stato è 'active', mostra il quiz. Il "!" dice a TypeScript "sono sicuro che config non è null"
      return <QuizActive config={quizConfig!} onFinish={handleFinishQuiz} />;
    case 'results':
      // Se lo stato è 'results', mostra i risultati
      return <QuizResults result={quizResult!} onRestart={handleRestart} />;
    case 'setup':
    default:
      // In tutti gli altri casi (o all'inizio), mostra la configurazione
      return <QuizSetup onStartQuiz={handleStartQuiz} />;
  }
};

export default SubjectQuiz;