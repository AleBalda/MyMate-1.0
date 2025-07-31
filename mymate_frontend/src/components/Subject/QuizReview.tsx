import React, { useState } from 'react';
import styles from './QuizReview.module.css';
import { FiCheck, FiX, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import avatarImg from '../../assets/aavatar.png';

interface QuizReviewProps {
  onRestart: () => void;
}

const reviewQuestions = [
  { questionText: 'What is the primary function of mitochondria?', options: ['Protein Synthesis', 'Cellular Respiration', 'DNA Replication', 'Lipid Storage'], userAnswer: 1, correctAnswer: 1, explanation: "Correct! Mitochondria are known as the 'powerhouses' of the cell because they generate most of the cell's supply of ATP." },
  { questionText: 'What is the derivative of x^2?', options: ['2x', 'x', 'x^3', '2'], userAnswer: 2, correctAnswer: 0, explanation: "Incorrect. The power rule of differentiation states that the derivative of x^n is n*x^(n-1), so the derivative of x^2 is 2x." },
  { questionText: 'Who wrote "The Prince"?', options: ['Dante Alighieri', 'Galileo Galilei', 'Niccolò Machiavelli', 'Leonardo da Vinci'], userAnswer: 2, correctAnswer: 2, explanation: "Correct! 'The Prince' is a 16th-century political treatise by the Italian diplomat and political theorist Niccolò Machiavelli." },
];

const QuizReview: React.FC<QuizReviewProps> = ({ onRestart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = reviewQuestions[currentQuestionIndex];

  const goToNext = () => {
    if (currentQuestionIndex < reviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <header className={styles.header}>
        <h2>Quiz Review ({currentQuestionIndex + 1} / {reviewQuestions.length})</h2>
        <button className={styles.restartButton} onClick={onRestart}>
          <FiRefreshCw /> Try Another Quiz
        </button>
      </header>
      
      <div className={styles.content}>
        {/* --- PANNELLO SINISTRO: AVATAR E SPIEGAZIONE --- */}
        <div className={styles.avatarPanel}>
          <img src={avatarImg} alt="AI Avatar" className={styles.avatar} />
          <div className={styles.bubble}>
            {currentQuestion.explanation}
          </div>
        </div>

        {/* --- PANNELLO DESTRO: DOMANDA E RISPOSTE --- */}
        <div className={styles.questionPanel}>
          <p className={styles.questionText}>{currentQuestion.questionText}</p>
          <div className={styles.options}>
            {currentQuestion.options.map((option, optIndex) => (
              <div 
                key={optIndex} 
                className={`
                  ${styles.option} 
                  ${optIndex === currentQuestion.correctAnswer ? styles.correct : ''} 
                  ${optIndex === currentQuestion.userAnswer && currentQuestion.userAnswer !== currentQuestion.correctAnswer ? styles.incorrect : ''}
                `}
              >
                {optIndex === currentQuestion.correctAnswer && <FiCheck />}
                {optIndex === currentQuestion.userAnswer && currentQuestion.userAnswer !== currentQuestion.correctAnswer && <FiX />}
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <button onClick={goToPrev} disabled={currentQuestionIndex === 0}>
          <FiChevronLeft /> Previous
        </button>
        <button onClick={goToNext} disabled={currentQuestionIndex === reviewQuestions.length - 1}>
          Next <FiChevronRight />
        </button>
      </footer>
    </div>
  );
};

export default QuizReview;