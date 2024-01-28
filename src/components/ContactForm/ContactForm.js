import styles from "./ContactForm.module.sass";
import { useState } from "react";
import { getString } from "../../i18n";

const ContactForm = ({ locale }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        loading: false,
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
        <div className={styles.contactForm}>
            <form onSubmit={onSubmit}>
                <div className={styles.section}>
                    <label>{getString(locale, "contactForm.name")}</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange}/>
                </div>
                <div className={styles.section}>
                    <label>{getString(locale, "contactForm.email")}</label>
                    <input type="text" name="email" value={formData.email} onChange={onChange}/>
                </div>
                <div className={styles.section}>
                    <label>{getString(locale, "contactForm.message")}</label>
                    <textarea rows={15} name="message" value={formData.message} onChange={onChange} />
                </div>
                <input type="submit" value={getString(locale, "contactForm.btnSubmit")} />
            </form>
        </div>
    );
}

export default ContactForm;