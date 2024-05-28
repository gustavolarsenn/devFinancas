import Button from "../../components/button";
import { Inputs, CurrencyInput } from "../../components/inputs";
import { Link } from "react-router-dom";
import styles from "./loginform.module.css";

const LoginForm = () => {
  return (
    <>
      <div className={styles.loginpage}>
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
                  <p>
                    Não tem conta ainda? <Link to="/registro">Registre-se</Link>
                  </p>
                </div>
                <div className={styles.btt}>
                  <Button name="Entrar" buttonStyle="open" to="/dashboard" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
