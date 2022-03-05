import { Link } from "react-router-dom";

// styles
import "./Navbar.css";
// assets
import Temple from "../../assets/temple.svg";
// hooks
import { useLogout } from "../../hooks/useLogout";
// context
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Navbar() {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <img src={Temple} alt="dojo logo" />
                    <span>dojo 🌌</span>
                </li>

                {!user && <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </>}

                {user && <li>{!isPending
                    ? <button className="btn" onClick={logout}>Logout</button>
                    : <button className="btn" disabled>Loggin out...</button>
                }</li>}
            </ul>
        </div>
    )
}
