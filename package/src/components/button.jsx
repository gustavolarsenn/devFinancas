import { Link } from 'react-router-dom';
import styles from './button.module.css';

const Button = ({name, buttonStyle, to}) => {
    return(
        <div>
            <button className={`${styles.buttonStyle} ${styles[buttonStyle]}`}>
                <Link to={to}>{name}</Link>
            </button>
        </div>
    )
}

export default Button;