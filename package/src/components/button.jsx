import { Link } from 'react-router-dom';
import styles from './button.module.css';

const Button = ({name, buttonStyle, to, onClick}) => {
    return(
        <div>
            <Link to={to}>
                <button 
                    className={`${styles.buttonStyle} ${styles[buttonStyle]}`} 
                    onClick={onClick}
                >
                    {name}
                </button>
            </Link>
        </div>
    )
}

export default Button;