import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css"

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Navbar />
            { children }
            <Footer />
        </div>

    );
}
 
export default Layout;