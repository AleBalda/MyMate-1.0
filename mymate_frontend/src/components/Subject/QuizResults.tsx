import React from 'react';
import resultStyles from './QuizResults.module.css';
import chatLayoutStyles from '../../pages/SubjectEnvironmentPage.module.css'; 
import type { QuizResult } from './SubjectQuiz';
import avatarImg from '../../assets/aavatar.png';

// Definiamo le props che il componente si aspetta di ricevere
interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onReview: () => void; 
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, onRestart, onReview }) => {
  // Calcola la percentuale del punteggio
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  // Funzione (placeholder) per determinare il feedback dell'avatar
  const getAvatarFeedback = () => {
    if (percentage >= 80) return "Great job! You nailed it!";
    if (percentage >= 60) return "Good work! Keep practicing.";
    return "Nice try! Let's review and try again.";
  };

  // Funzione per determinare la classe di colore del cerchio del punteggio
  const getScoreColorClass = () => {
    if (percentage >= 80) return resultStyles.scoreGood;
    if (percentage >= 60) return resultStyles.scoreMedium;
    return resultStyles.scoreBad;
  };

  return (
    // Usa le classi di layout della chat per coerenza visiva
    <div className={chatLayoutStyles.chatView}>
      
      {/* --- PANNELLO SINISTRO: AVATAR --- */}
      <div className={chatLayoutStyles.avatarPanel}>
        <div className={resultStyles.avatarContainer}>
          <img src={avatarImg} alt="AI Avatar" className={resultStyles.avatar} />
          <div className={resultStyles.feedbackBubble}>
            <p>{getAvatarFeedback()}</p>
          </div>
        </div>
      </div>

      {/* --- PANNELLO DESTRO: RISULTATI --- */}
      <div className={`${chatLayoutStyles.chatPanel} ${resultStyles.resultsPanel}`}>
        <h2>Quiz Complete!</h2>
        <p className={resultStyles.subtitle}>Here are your results.</p>
        
        <div className={`${resultStyles.scoreCircle} ${getScoreColorClass()}`}>
          <strong>{percentage}%</strong>
          <span>SCORE</span>
        </div>
        
        <p className={resultStyles.summaryText}>
          You answered <strong>{result.score} out of {result.totalQuestions}</strong> questions correctly.
        </p>

        <div className={resultStyles.actions}>
          {/* Il pulsante "Review Answers" chiama la funzione onReview */}
          <button className={resultStyles.secondaryButton} onClick={onReview}>
            Review Answers
          </button>
          <button className={resultStyles.primaryButton} onClick={onRestart}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;