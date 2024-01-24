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
                <li className={activePath === "/posts?category=travel" ? styles.active : ""}>
                    <Link to={`${locale}/posts?category=travel`}>
                        { getString('en', 'header.menu.travel') }
                    </Link>
                </li>
                <li className={activePath === "/posts?category=inner" ? styles.active : ""}>
                    <Link to={`${locale}/posts?category=inner`}>
                        { getString(locale, 'header.menu.inner') }
                    </Link>
                </li>
                <li className={activePath === "/posts?category=outer" ? styles.active : ""}>
                    <Link to={`${locale}/posts?category=outer`}>
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