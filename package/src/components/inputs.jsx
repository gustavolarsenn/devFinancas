import styles from './inputs.module.css';
import { NumericFormat } from 'react-number-format';

const Inputs = ({id, type, value, inputStyle, placeholder, onChange}) => {
    return(
        <div>
            <input 
                type={type} 
                value={value} 
                className={`${styles.inputStyle} ${styles[inputStyle]}`} 
                placeholder={placeholder} 
                onChange={e => onChange(e.target.value)} 
                id={id}
                required
            />
        </div>
    )
}

const CurrencyInput = ({ id, value, inputStyle}) => {
  
    return (
      <div>
        <NumericFormat
            required
            placeholder="R$00,00"
            label="Valor"
            value={value}
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=','            
            thousandSeparator='.'
            className={`${styles.inputStyle} ${styles[inputStyle]}`}
            id={id}
        />  
      </div>
    );
  };
  
  

export { Inputs, CurrencyInput };
