import styles from './loadingSpinner.module.css';

const Spinner = () => {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    );
};

export default Spinner;