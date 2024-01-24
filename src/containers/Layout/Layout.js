import styles from "./Layout.module.sass";

const Layout = ({ children }) => {
    return (
        <div className={"container"}>
            { children }
        </div>
    )
}

export default Layout;