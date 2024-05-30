import Container from "./container";
import styles from "./navbar.module.css";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons/lib";


const Navbar = () => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Container>
      <IconContext.Provider value={{color: '#fff'}}>
      <div className={styles.navbar}>
        <Link to="#" className={styles.menubars}>
          <FaBars onClick={showSidebar}/>
        </Link>
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
