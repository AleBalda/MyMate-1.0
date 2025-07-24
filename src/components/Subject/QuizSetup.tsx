import React, { useState } from 'react';
import styles from './QuizSetup.module.css';
import { FiUploadCloud } from 'react-icons/fi';
import type { QuizConfig } from './SubjectQuiz';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz }) => {
  const [numQuestions, setNumQuestions] = useState(25);
  
  const handleStart = () => {
    // Quando l'utente clicca, chiamiamo la funzione del genitore con i dati raccolti
    onStartQuiz({
      numQuestions: numQuestions,
      topics: ['Derivatives'], // Dati placeholder per ora
      questionTypes: ['Multiple Choice'] // Dati placeholder
    });
  };

  return (
    <div className={styles.container}>
      <h2>Prepare Your Quiz</h2>
      
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
            <input type="text" placeholder="Enter topics (e.g., Integrals, Limits)..."/>
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

      <div className={styles.card}>
        <div className={styles.dropzone}>
          <FiUploadCloud size={32} />
          <span>Or, let me create a quiz from your notes!</span>
          <button className={styles.secondaryButton}>Upload a File (.pdf, .docx)</button>
        </div>
      </div>

      <button className={styles.startButton} onClick={handleStart}>Start Quiz</button>
    </div>
  );
};

export default QuizSetup;