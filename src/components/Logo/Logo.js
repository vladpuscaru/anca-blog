import styles from "./Logo.module.sass";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link to={"/"}>ancamierloiu</Link>
        </div>
    )
}

export default Logo;