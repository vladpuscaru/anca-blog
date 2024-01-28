import styles from "./SocialList.module.sass";
import icFacebook from "../../common/images/ic_facebook.svg";
import icInstragram from "../../common/images/ic_instagram.svg";
import icTwitter from "../../common/images/ic_twitter.svg";
import { ReactSVG } from "react-svg";

const SocialList = () => {
    return (
        <div className={styles.socialList}>
            <a href={"#"} target={"_blank"}>
                <ReactSVG src={icFacebook}/>
            </a>
            <a href={"#"} target={"_blank"}>
                <ReactSVG src={icInstragram}/>
            </a>
            <a href={"#"} target={"_blank"}>
                <ReactSVG src={icTwitter}/>
            </a>
        </div>
    )
};

export default SocialList;