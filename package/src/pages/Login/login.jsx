import Container from "../../components/container";
import LoginForm from "./loginform";
import styles from "./login.module.css";
import img from "../../img/logo.png";

const Login = () => {
  return (
    
    <Container>
      <div className={styles.loginpage}>
        <div>
          <div>
            <img src={img} alt="" className={styles.img} />
          </div>
        </div>
        <LoginForm />
      </div>
    </Container>
    
  );
}

export default Login;
