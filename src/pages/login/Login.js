import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("test@test.com")
    const [password, setPassword] = useState("test123")
    const { login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {/* since we wrapping inputs with label we don't need htmlFor prop */}
            <label>
                <span>email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending
                ? <button className="btn">Login</button>
                : <button className="btn" disabled>Logging in...</button>
            }
            {error && <div className="error">{error}</div>}
        </form>
    )
}

