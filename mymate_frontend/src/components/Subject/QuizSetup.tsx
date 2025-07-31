import React, { useState } from 'react';
import styles from './QuizSetup.module.css';
import { FiUploadCloud, FiChevronRight } from 'react-icons/fi';
import type { QuizConfig } from './SubjectQuiz';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

// Dati di esempio per la cronologia dei quiz
const pastQuizzes = [
  { id: 1, date: '2025-10-28', score: 8, total: 10, topics: 'Derivatives' },
  { id: 2, date: '2025-10-25', score: 5, total: 10, topics: 'Limits, Integrals' },
  { id: 3, date: '2025-10-22', score: 9, total: 10, topics: 'General Recap' },
  { id: 4, date: '2025-10-20', score: 10, total: 10, topics: 'Full Test' },
];

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz }) => {
  const [numQuestions, setNumQuestions] = useState(10);
  
  const handleStart = () => {
    onStartQuiz({
      numQuestions: numQuestions,
      topics: ['Derivatives'], // Dati placeholder
      questionTypes: ['Multiple Choice'] // Dati placeholder
    });
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return styles.scoreGood;
    if (percentage >= 60) return styles.scoreMedium;
    return styles.scoreBad;
  };

  return (
    <div className={styles.setupContainer}>
      
      {/* --- PANNELLO SINISTRO: CONFIGURAZIONE NUOVO QUIZ --- */}
      <div className={styles.configPanel}>
        <h2>Prepare Your Quiz</h2>
        
        {/* Nuovo contenitore Grid per le due card affiancate */}
        <div className={styles.configGrid}>
          
          {/* CARD #1: Opzioni del Quiz */}
          <div className={styles.card}>
            <div className={styles.settingRow}>
              <label>Number of Questions: <strong>{numQuestions}</strong></label>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
            <div className={styles.settingRow}>
              <label>Specific Topics</label>
              <div className={styles.tagInput}>
                <span className={styles.tag}>Derivatives <button>x</button></span>
                <input type="text" placeholder="Enter topics..."/>
              </div>
            </div>
            <div className={styles.settingRow}>
              <label>Question Types</label>
              <div className={styles.buttonGroup}>
                <button className={styles.active}>Multiple Choice</button>
                <button>Open Answer</button>
                <button>Fill-in-the-blank</button>
              </div>
            </div>
          </div>
          
          {/* CARD #2: Upload da File */}
          <div className={`${styles.card} ${styles.dropzoneCard}`}>
            <div className={styles.dropzone}>
              <FiUploadCloud size={32} />
              <span>Or, let me create a quiz from your notes!</span>
              <button className={styles.secondaryButton}>Upload a File (.pdf, .docx)</button>
            </div>
          </div>
        </div>
        
        {/* PULSANTE FINALE "Start Quiz" */}
        <button className={styles.startButton} onClick={handleStart}>Start Quiz</button>
      </div>

      {/* --- PANNELLO DESTRO: CRONOLOGIA QUIZ --- */}
      <div className={styles.historyPanel}>
        <h3>Quiz History</h3>
        <div className={styles.historyList}>
          {pastQuizzes.map(quiz => (
            <div key={quiz.id} className={styles.historyItem}>
              <div className={styles.quizInfo}>
                <strong>Topics: {quiz.topics}</strong>
                <span>{quiz.date}</span>
              </div>
              <div className={styles.quizScore}>
                <div className={`${styles.scoreCircle} ${getScoreColor(quiz.score, quiz.total)}`}>
                  {quiz.score}/{quiz.total}
                </div>
                <FiChevronRight />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default QuizSetup;
