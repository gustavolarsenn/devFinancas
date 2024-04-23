import Button from "../../components/button"
import Inputs from "../../components/inputs"
import { Link } from 'react-router-dom';
import styles from "../Login/loginform.module.css"
import img from "../../img/logo.png"

function RegisterForm(){
    return(
        <>
         <div>
            <div>
                <img src={img} alt=""  className={styles.img}/>
            </div>
        </div>   
        <div className={styles.container}>
            <div className={styles.login}>
            <form>
                <div>
                    <h1>Registro</h1>
                </div>
                <div className={styles.box}>
                    <div className={styles.lab}>
                        <label>Usuário</label>
                        <Inputs 
                            type="text"
                            placeholder="Digite seu username aqui..."
                            inputStyle="input_login"
                        />
                    </div>
                    <div className={styles.lab}>
                        <label>E-mail</label>
                        <Inputs 
                            type="text"
                            placeholder="Digite seu e-mail aqui..."
                            inputStyle="input_login"
                        />
                    </div>
                    <div className={styles.lab}>
                        <label>Senha</label>
                        <Inputs 
                            type="password"
                            placeholder="Digite sua senha aqui..."
                            inputStyle="input_login"
                        />
                    </div >
                    <div className={styles.btt}>
                        <Button 
                            name="Criar Conta"
                            buttonStyle="open"
                            to="/"
                        />     
                        <Button 
                            name="Voltar"
                            buttonStyle="open"
                            to="/"
                        />  
                    </div>
                              
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

export default RegisterForm