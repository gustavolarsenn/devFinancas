import styles from './inputs.module.css'

function Inputs({type, value, inputStyle, placeholder}) {
    return(
        <div>
            <input type={type} value={value} className={`${styles.inputStyle} ${styles[inputStyle]}`} placeholder={placeholder}/>
        </div>
    )
}

export default Inputs