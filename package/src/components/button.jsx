import styles from './button.module.css'

function Button({name, buttonStyle, placeholder}) {
    return(
        <div>
            <button className={`${styles.buttonStyle} ${styles[buttonStyle]}`}>{name}</button>
        </div>
    )
}

export default Button