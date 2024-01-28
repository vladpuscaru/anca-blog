import styles from "./Banner.module.sass";
import { Parser } from "html-to-react";

const Banner = ({title, description}) => {
    const parser = new Parser();

    return (
        <div className={styles.banner}>
            <div className={styles.col}>
                <h1>{title}</h1>
            </div>
            <div className={styles.col}>
                <p>{parser.parse(description)}</p>
            </div>
        </div>
    )
};

export default Banner;