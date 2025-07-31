import React, { useState, useEffect } from 'react';
import styles from './QuizActive.module.css';
import type { QuizConfig, QuizResult } from './SubjectQuiz';

// ---- MODIFICA 1: Importiamo l'hook per la logica utente ----
import { useUser } from '../../hooks/useUser'; // Assicurati che questo percorso sia corretto per la tua struttura

// --- Tipi e Dati di Esempio (invariati) ---
interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

interface QuizActiveProps {
  config: QuizConfig;
  onFinish: (result: QuizResult) => void;
}

// Dati di esempio per le domande
const allQuestions: Question[] = [
  { questionText: 'What is the primary function of mitochondria?', options: ['Protein Synthesis', 'Cellular Respiration', 'DNA Replication', 'Lipid Storage'], correctAnswer: 1 },
  { questionText: 'What is the derivative of x^2?', options: ['2x', 'x', 'x^3', '2'], correctAnswer: 0 },
  { questionText: 'Who wrote "The Prince"?', options: ['Dante Alighieri', 'Galileo Galilei', 'Niccolò Machiavelli', 'Leonardo da Vinci'], correctAnswer: 2 },
  { questionText: 'What is the chemical symbol for Gold?', options: ['Ag', 'Au', 'Pb', 'Fe'], correctAnswer: 1 },
  { questionText: 'In which year did the Titanic sink?', options: ['1905', '1912', '1918', '1923'], correctAnswer: 1 },
];


const QuizActive: React.FC<QuizActiveProps> = ({ config, onFinish }) => {
  // --- Stati del componente (invariati) ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // ---- MODIFICA 2: Attiviamo l'hook per ottenere la funzione di gamification ----
  const { triggerGamificationEvent } = useUser();


  // --- Logica per preparare le domande (invariata) ---
  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, config.numQuestions));
  }, [config]);

  // --- Logica per gestire la selezione di una risposta (invariata) ---
  const handleAnswerSelect = (selectedIndex: number) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(selectedIndex);

    if (selectedIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  // --- Logica per passare alla domanda successiva o finire il quiz (MODIFICATA) ---
  const handleNext = () => {
    // Controlliamo se siamo all'ultima domanda
    if (currentQuestionIndex < questions.length - 1) {
      // Se non lo siamo, passiamo alla prossima
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      // ---- MODIFICA 3: QUI SCATTA L'EVENTO DI GAMIFICATION! ----
      // Se siamo all'ultima domanda, prima notifichiamo il backend...
      console.log('Quiz terminato. Triggero evento.');
      triggerGamificationEvent('COMPLETE_QUIZ');

      // ...e poi eseguiamo la logica originale per terminare il quiz.
      onFinish({ score: score, totalQuestions: questions.length });
    }
  };
  
  // --- Gestione del caricamento iniziale (invariata) ---
  if (questions.length === 0) {
    return <div>Preparing your quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // --- JSX (struttura visiva, invariata) ---
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
        <div className={styles.progressBar}><div style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div></div>
        <button className={styles.exitButton}>Exit Quiz</button>
      </div>
  
      <h2 className={styles.questionText}>{currentQuestion.questionText}</h2>
      
      <div className={styles.optionsGrid}>
        {currentQuestion.options.map((option, index) => {
          let buttonClass = styles.optionCard;
          if (isAnswered) {
            if (index === currentQuestion.correctAnswer) {
              buttonClass += ` ${styles.correct}`;
            } else if (index === selectedAnswer) {
              buttonClass += ` ${styles.incorrect}`;
            }
          }
          return (
            <button 
              key={index} 
              className={buttonClass}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
          {isAnswered && (
            // Questo bottone ora triggererà la nuova logica in handleNext
            <button className={styles.nextButton} onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
      </div>
    </div>
  );
};

export default QuizActive;