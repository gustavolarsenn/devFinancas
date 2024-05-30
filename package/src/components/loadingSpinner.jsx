import styles from './loadingSpinner.css';

const Spinner = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#CBCBCB'
      }}>
        <div style={{
          border: '2px solid #f3f3f3',
          borderRadius: '50%',
          borderTop: '2px solid #1F2731',
          width: '50px',
          height: '50px',
          animation: 'spin 0.7s linear infinite'
        }} />
      </div>
    );
  };
  
  export default Spinner;