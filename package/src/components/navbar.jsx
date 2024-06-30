import Container from "./container";
import styles from "./navbar.module.css";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons/lib";
import styled from "styled-components";
import img from "../img/logotransp.png";

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
        <img src={img} alt="" style={{margin: '10px 0 0 0'}}/>
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
        <img src={img} alt="" style={{height: '150px', position: 'absolute', bottom: '-20px', left: '47px'}}/> {/* GAMBIARRA KKKKK*/}
        </ul>
      </nav>
      </IconContext.Provider>
    </Container>
  );
}

export default Navbar;
