import styles from './button.css'

function Button({name, value, placeholder}) {
    return(
        <div>
            <button>{name}</button>
        </div>
    )
}

export default Button