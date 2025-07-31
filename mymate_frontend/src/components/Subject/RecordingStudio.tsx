import React, { useState, useEffect, useRef } from 'react';
import styles from './RecordingStudio.module.css';
import { FiMic, FiPause, FiPlay, FiSave, FiX, FiTrash2 } from 'react-icons/fi';

interface RecordingStudioProps {
  onClose: () => void;
  onSave: (recording: { title: string; blob: Blob }) => void;
}

const RecordingStudio: React.FC<RecordingStudioProps> = ({ onClose, onSave }) => {
  type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped';
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  // Gestisce il timer del conteggio
  useEffect(() => {
    if (recordingState === 'recording') {
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [recordingState]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingState('recording');
      setRecordingTime(0);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingState('stopped');
    }
  };

  const handleSave = () => {
    if (audioBlob) {
      const newTitle = `Recording - ${new Date().toLocaleString()}`;
      onSave({ title: newTitle, blob: audioBlob });
      onClose();
    }
  };

  const handleDiscard = () => {
    setRecordingState('idle');
    setRecordingTime(0);
    setAudioBlob(null);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.studioContainer}>
      <button className={styles.closeButton} onClick={onClose} title="Back to list"><FiX /></button>
      
      <div className={styles.micWrapper} data-state={recordingState}>
        <FiMic size={80} />
      </div>

      <div className={styles.timerDisplay}>
        {formatTime(recordingTime)}
      </div>

      <div className={styles.controls}>
        {recordingState === 'idle' && (
          <button className={styles.primaryAction} onClick={startRecording}>
            Start Recording
          </button>
        )}

        {recordingState === 'recording' && (
          <>
            <button className={styles.secondaryAction} onClick={pauseRecording}>
              <FiPause /> Pause
            </button>
            <button className={styles.primaryAction} onClick={stopRecording}>
              <FiSquare /> Stop
            </button>
          </>
        )}

        {recordingState === 'paused' && (
          <>
            <button className={styles.secondaryAction} onClick={stopRecording}>
              <FiSquare /> Stop
            </button>
            <button className={styles.primaryAction} onClick={resumeRecording}>
              <FiPlay /> Resume
            </button>
          </>
        )}

        {recordingState === 'stopped' && (
          <>
            <button className={styles.secondaryAction} onClick={handleDiscard}>
              <FiTrash2 /> Discard
            </button>
            <button className={styles.primaryAction} onClick={handleSave}>
              <FiSave /> Save Recording
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecordingStudio;