import Button from "../../components/button"
import Inputs from "../../components/inputs"
import styles from "./loginform.module.css"
import img from "../../img/logo.png"

function LoginForm(){
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
                    <h1>Login</h1>
                </div>
                <div className={styles.box}>
                    <div className={styles.lab}>
                        <label>Usuário ou e-mail</label>
                        <Inputs 
                            type="text"
                            placeholder="Digite seu username aqui..."
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
                        <p>Não tem conta ainda? <a href="">Registre-se</a></p>
                    </div>
                        <Button 
                            name="Entrar"
                            buttonStyle="open"
                        />         
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

export default LoginForm