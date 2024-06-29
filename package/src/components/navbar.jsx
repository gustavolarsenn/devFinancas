import Container from "./container";
import styles from "./navbar.module.css";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons/lib";
import styled from "styled-components";

const HideButton = styled.div`
    position: absolute;
    right: 3%;
    font-size: 2rem;
    padding: 10px;
    cursor: pointer;
`;

const Navbar = ({icon}) => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Container>
      <IconContext.Provider value={{color: '#fff'}}>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menubars}>
          <FaBars onClick={showSidebar}/>
        </Link>
        <h1>Finances</h1>
        <HideButton>
          {icon}
        </HideButton>
      </div>
      <nav className={`${styles.navmenu} ${sidebar ? styles.active : styles.navmenu}`}>
        <ul className={styles.items}>
            <li className={styles.toggle}>
              <Link to="#" className={styles.menubars}>
                <IoClose onClick={showSidebar}/>
              </Link>
            </li>
            {NavbarData.map((item, index) => {
              return(
                <li key={index} className={styles.navtext}>
                  <Link to={item.path} onClick={item.onClick}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
            
        </ul>
      </nav>
      </IconContext.Provider>
    </Container>
  );
}

export default Navbar;
