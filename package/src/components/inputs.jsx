import styles from './inputs.module.css'

const Inputs = ({type, value, inputStyle, placeholder}) => {
    return(
        <div>
            <input type={type} value={value} className={`${styles.inputStyle} ${styles[inputStyle]}`} placeholder={placeholder} required/>
        </div>
    )
}

export default Inputs