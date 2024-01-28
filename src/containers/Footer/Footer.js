import styles from "./Footer.module.sass";
import { getString } from "../../i18n";
import Newsletter from "../../components/Newsletter/Newsletter";
import SocialList from "../../components/SocialList/SocialList";

const Footer = ({locale}) => {
    return (
        <footer>
            <div className={"container"}>
                <div className={styles.footer}>
                    <div className={styles.section}>
                        <h2>{getString(locale, "footer.social.title")}</h2>
                        <SocialList/>
                    </div>
                    <div className={styles.section}>
                        <h2>{getString(locale, "footer.newsletter.title")}</h2>
                        <p>{getString(locale, "footer.newsletter.subtitle")}</p>
                        <Newsletter locale={locale}/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;