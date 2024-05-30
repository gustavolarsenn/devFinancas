import React, { useState } from 'react';
import axios from 'axios';
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { Inputs, CurrencyInput } from "../../components/inputs";
import styles from "./registerform.module.css";
import { register } from './register_logic';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const csrfTokenResponse = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
    const csrfToken = csrfTokenResponse.data;

    const success = await register(username, password, email, csrfToken);
    if (success) {
      navigate("/");
      console.log("Registered in successfully!");
    } else {
      setErrorMessage('Erro ao registrar usuário!');
    }
  };
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
                    id="username"
                    type="text"
                    placeholder="Digite seu username aqui..."
                    inputStyle="input_login"
                    value={username}
                    onChange={setUsername}
                  />
                </div>
                <div className={styles.lab}>
                  <label>E-mail</label>
                  <Inputs
                    id="email"
                    type="text"
                    placeholder="Digite seu e-mail aqui..."
                    inputStyle="input_login"
                    value={email}
                    onChange={setEmail}
                  />
                </div>
                <div className={styles.lab}>
                  <label>Senha</label>
                  <Inputs
                    id="password"
                    type="password"
                    placeholder="Digite sua senha aqui..."
                    inputStyle="input_login"
                    value={password}
                    onChange={setPassword}
                  />
                </div>
                <p>{errorMessage}</p>
                <div className={styles.btt}>
                  <Button name="Criar Conta" buttonStyle="open" onClick={handleRegister}/>
                  <Button name="Voltar" buttonStyle="open" to="/"/>
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
