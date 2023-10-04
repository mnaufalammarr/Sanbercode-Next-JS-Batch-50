import Menu from "../menu"
import withAuth from "../with-auth"

function Header() {
    return <div>
        <Menu />
        <h1>Header</h1>
    </div>
    }

export default withAuth(Header)