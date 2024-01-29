import styles from "./Menu.module.sass"
import { Link } from "react-router-dom";
import { getString } from "../../i18n";

const Menu = ({locale, onLocaleChange, activePath, activeHash}) => {
    return (
        <nav className={styles.menu}>
            <ul>
                <li className={activeHash === "about" ? styles.active : ""}>
                    <Link to={`${locale}#about`}>
                        { getString(locale, 'header.menu.about') }
                    </Link>
                </li>
                <li className={activePath === "/posts" ? styles.active : ""}>
                    <Link to={`${locale}/posts`}>
                        { getString(locale, 'header.menu.posts') }
                    </Link>
                </li>
                <li className={activePath === "/posts?categories=Travel" ? styles.active : ""}>
                    <Link to={`${locale}/posts?categories=Travel`}>
                        { getString('en', 'header.menu.travel') }
                    </Link>
                </li>
                <li className={activePath === "/posts?categories=Inner" ? styles.active : ""}>
                    <Link to={`${locale}/posts?categories=Inner`}>
                        { getString(locale, 'header.menu.inner') }
                    </Link>
                </li>
                <li className={activePath === "/posts?categories=Outer" ? styles.active : ""}>
                    <Link to={`${locale}/posts?categories=Outer`}>
                        { getString(locale, 'header.menu.outer') }
                    </Link>
                </li>
                <li className={activeHash === "contact" ? styles.active : ""}>
                    <Link to={`${locale}#contact`}>
                        { getString(locale, 'header.menu.contact') }
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu;