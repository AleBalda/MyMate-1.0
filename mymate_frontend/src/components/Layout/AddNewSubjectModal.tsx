import React from 'react';
import styles from './AddNewSubjectModal.module.css';
import { FiUploadCloud, FiBookOpen } from 'react-icons/fi';

const AddNewSubjectModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FiBookOpen />
        <h2>Add a New Subject</h2>
      </div>
      
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="subjectName">Subject Name</label>
          <input type="text" id="subjectName" placeholder="e.g., Analisi Matematica II" />
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="cfu">CFU</label>
            <input type="number" id="cfu" placeholder="e.g., 9" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="professor">Professor (optional)</label>
            <input type="text" id="professor" placeholder="e.g., Mario Rossi" />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Syllabus or Main Document</label>
          <div className={styles.dropzone}>
            <FiUploadCloud size={24} />
            <span>Drag & drop a file here or click to upload</span>
            <input type="file" />
          </div>
        </div>

        <div className={styles.disclaimer}>
          <input type="checkbox" id="ai-consent" />
          <label htmlFor="ai-consent">
            The file you upload will be used to train our AI. Please confirm that you are the author of this document or have the right to share it.
          </label>
        </div>
        
        <button type="submit" className={styles.submitButton}>Add Subject</button>
      </form>
    </div>
  );
};

export default AddNewSubjectModal;