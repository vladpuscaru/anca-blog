import styles from "./BannerHero.module.sass";

const BannerHero = ({title, subtitle}) => {
    return (
        <div className={styles.hero}>
            <div className={styles.inner}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </div>
        </div>
    )
}

export default BannerHero;