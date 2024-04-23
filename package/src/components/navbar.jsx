import Container from "./container";
import img from "../img/logo.png";
import styles from "./navbar.module.css"

function Navbar() {
    return(
        <Container>
                <div className={styles.navbar}>
                    <nav>
                        <img src={img}/>
                        <hr />
                        <ul>
                            <li>Home</li>
                            <hr />
                            <li>Cadastrar</li>
                            <hr />
                            <li>Histórico</li>
                            <hr />
                        </ul>
                        <p>Logout</p>
                    </nav>
                </div>
        </Container>
    )
}

export default Navbar