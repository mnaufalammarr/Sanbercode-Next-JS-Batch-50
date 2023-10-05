import Menu from "../menu"
import withAuth from "../with-auth"
import styles from "./style.module.css"

function Header() {
    return <div>
        <Menu />
        <div className={styles.header}>Header</div>
    </div>
    }

export default withAuth(Header)