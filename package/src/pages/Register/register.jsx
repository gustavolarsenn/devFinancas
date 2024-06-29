import Container from '../../components/container';
import RegisterForm from './registerform';
import img from "../../img/EasyFinance.png";
import styles from "./register.module.css";

const Register = () => {
    return(
        <Container>
            <div className={styles.registerpage}>
                <div>
                    <div>
                        <img src={img} alt="" className={styles.img} />
                    </div>
                </div>
            </div>
            <RegisterForm />
        </Container>
    )
}

export default Register