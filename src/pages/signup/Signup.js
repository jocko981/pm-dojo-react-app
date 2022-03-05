import { useState } from "react";

// styles
import "./Signup.css";
// hooks
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState("")
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selectedFile = e.target.files[0]

        if (!selectedFile) {
            setThumbnailError("Please select your thumbnail image c:")
            return
        }
        if (!selectedFile.type.includes("image")) {
            setThumbnailError("File must be an image :D")
            return
        }
        if (selectedFile.size > 500000) {
            setThumbnailError("Hey, sorry, image must be less than 0.5MB")
            return
        }
        // every return here after if() means: code returns out of the function
        // and none of the rest of the function is gonna fire
        setThumbnailError("")

        setThumbnail(selectedFile)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
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
            <label>
                <span>display name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>profile thumbnail:</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange}
                />
            </label>
            {thumbnailError && <div className="error">{thumbnailError}</div>}
            {!isPending
                ? <button className="btn">Sign up</button>
                : <button className="btn" disabled>Pending...</button>
            }
            {error && <div className="error">{error}</div>}
        </form>
    )
}

