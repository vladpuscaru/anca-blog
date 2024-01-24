import styles from "./PageHome.module.sass";
import BannerHero from "../../components/BannerHero/BannerHero";
import { getString } from "../../i18n";
import { useLocation } from "react-router-dom";

const PageHome = () => {
    const {pathname} = useLocation();
    const locale = pathname.split("/")[1];

    return (
        <div className={styles.home}>
            <BannerHero
                title={getString(locale, "homePage.bannerHero.title")}
                subtitle={getString(locale, "homePage.bannerHero.subtitle")} />
        </div>
    )
}

export default PageHome;