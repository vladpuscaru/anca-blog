import styles from "./Header.module.sass";
import Menu from "../../components/Menu/Menu";
import { useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

const Header = ({locale, changeLocale}) => {
    const {pathname, search, hash} = useLocation();

    return (
        <header>
            <div className={"container"}>
                <p onClick={() => changeLocale('ro')}>LOREM</p>
                <Logo/>
                <Menu
                    locale={locale}
                    activePath={`${pathname}${search}`}
                    activeHash={hash}
                />
            </div>
        </header>
    )
}

export default Header;