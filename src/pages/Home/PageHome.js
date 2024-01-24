import styles from "./PageHome.module.sass";
import BannerHero from "../../components/BannerHero/BannerHero";

const PageHome = () => {
    return (
        <div className={styles.home}>
            <BannerHero title={"Everything I have to say"} subtitle={""} />
        </div>
    )
}

export default PageHome;