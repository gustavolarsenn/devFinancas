import React, { useState } from 'react';
import axios from 'axios';
import Button from "../../components/button";
import {Inputs} from "../../components/inputs";
import { Link, useNavigate } from "react-router-dom";
import styles from "./loginform.module.css";
import { login } from './login_logic';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const csrfTokenResponse = await axios.get('http://localhost:8000/csrf-token', { withCredentials: true });
      const csrfToken = csrfTokenResponse.data;
   
      const success = await login(username, password, csrfToken);
      
      if (success) {
        navigate("/dashboard");
        setUsername(""); 
        setPassword(""); 
        console.log("Logged in successfully");
      } else {
        setErrorMessage('Usuário não existe ou credenciais erradas!');
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
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
                    id="username"
                    type="text"
                    placeholder="Digite seu username aqui..."
                    inputStyle="input_login"
                    value={username}
                    onChange={setUsername}
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
                  <p>
                    Não tem conta ainda? <Link to="/registro">Registre-se</Link>
                  </p>
                </div>
                <p>{errorMessage}</p>
                <div className={styles.btt}>
                  <Button name="Entrar" buttonStyle="open" onClick={handleLogin}></Button>
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
