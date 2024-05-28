import React, { useState } from 'react';
import Button from "../../components/button";
import Inputs from "../../components/inputs";
import { Link, redirect } from "react-router-dom";
import styles from "./loginform.module.css";
import { login } from './login_logic';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      redirect("/dashboard")
      console.log("Logged in successfully!")
      // Redirecione para a página do painel ou faça algo
    } else {
      redirect("/register")
      console.log("Failed to log in!")
      // Mostre uma mensagem de erro ou faça algo
    }
  };
  return (
    <>
    <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
      <div className={styles.loginpage}>
        <div className={styles.container}>
          <div className={styles.login}>
            <form onSubmit={e => e.preventDefault()}>
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
