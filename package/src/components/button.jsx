import { Link } from 'react-router-dom';
import styles from './button.module.css';

const Button = ({name, buttonStyle, to}) => {
    return(
        <div>
            <Link to={to}>
                <button className={`${styles.buttonStyle} ${styles[buttonStyle]}`}>
                    {name}
                </button>
            </Link>
        </div>
    )
}

export default Button;