import styles from './inputs.module.css';
import { NumericFormat } from 'react-number-format';

const Inputs = ({type, value, inputStyle, placeholder, onChange}) => {
    return(
        <div>
            <input 
                type={type} 
                value={value} 
                className={`${styles.inputStyle} ${styles[inputStyle]}`} 
                placeholder={placeholder} 
                onChange={e => onChange(e.target.value)} 
                required
            />
        </div>
    )
}

const CurrencyInput = ({ value, inputStyle}) => {
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
        />  
      </div>
    );
  };
  
  

export { Inputs, CurrencyInput };
