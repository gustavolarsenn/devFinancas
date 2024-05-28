import Button from "../../components/button";
import { Inputs, CurrencyInput } from "../../components/inputs";
import styles from "./registerform.module.css";

function RegisterForm() {
  return (
    <>
      <div className={styles.registerpage}>
        <div className={styles.container}>
          <div className={styles.register}>
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
                </div>
                <div className={styles.btt}>
                  <Button name="Criar Conta" buttonStyle="open" to="/" />
                  <Button name="Voltar" buttonStyle="open" to="/" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
