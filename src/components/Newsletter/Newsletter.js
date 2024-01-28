import styles from "./Newsletter.module.sass";
import { useState } from "react";
import { getString } from "../../i18n";

const Newsletter = ({locale}) => {
    const [formData, setFormData] = useState({
        email: "",
        submitted: false
    });

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setFormData({
           ...formData,
           [e.target.name]: e.target.value
        });
    }

    return (
        <div className={styles.newsletter}>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={formData.email} onChange={onChange}/>
                <input type="submit" value={getString(locale, "newsletter.btnSubmit")} />
            </form>
        </div>
    )
};

export default Newsletter;