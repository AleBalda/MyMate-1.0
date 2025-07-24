import React from 'react';
import styles from './QuizResults.module.css';
import type { QuizResult } from './SubjectQuiz';

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, onRestart }) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className={styles.container}>
      <h2>Quiz Complete!</h2>
      <p>Here are your results.</p>
      <div className={styles.scoreCircle}>
        <strong>{percentage}%</strong>
        <span>Score</span>
      </div>
      <p>You answered <strong>{result.score} out of {result.totalQuestions}</strong> questions correctly.</p>
      <div className={styles.actions}>
        <button className={styles.secondaryButton}>Review Answers</button>
        <button className={styles.primaryButton} onClick={onRestart}>Try Again</button>
      </div>
    </div>
  );
};

export default QuizResults;