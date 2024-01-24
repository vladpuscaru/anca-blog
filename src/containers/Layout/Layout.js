import styles from "./Layout.module.sass";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React from "react";

const Layout = ({locale, changeLocale, children}) => {
    return (
        <div className={styles.layout}>
            <Header locale={locale} changeLocale={changeLocale}/>
            <main locale={locale}>
                { React.cloneElement(children, {locale}) }
            </main>
            <Footer locale={locale}/>
        </div>
    )
}

export default Layout;