import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// styles
import "./Create.css";
// firebase
import { timestamp } from "../../firebase/config";
// hooks
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
// context
import { useAuthContext } from "../../hooks/useAuthContext";

const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" }
]

export default function Create() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore("projects")
    const { user } = useAuthContext()
    const { documents } = useCollection("users")
    const [users, setUsers] = useState([])
    // form fields
    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [category, setCategory] = useState("")
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const [formCaughtErrorOnce, setFormCaughtErrorOnce] = useState(false)

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    useEffect(() => {
        if (formCaughtErrorOnce) {
            if (category && assignedUsers.length) {
                setFormError(null)
                return
            }
        }
    }, [formCaughtErrorOnce, category, assignedUsers.length])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category && !assignedUsers.length) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select your project Category and Assign at least 1 user")
            return
        }
        if (!category) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select your project Category")
            return
        }
        if (!assignedUsers.length) {
            setFormCaughtErrorOnce(true)
            setFormError("Please Assign at least 1 user to the project")
            return
        }

        const createdBy = {
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                id: u.value.id,
                displayName: u.value.displayName,
                photoURL: u.value.photoURL
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            // assignedUsers:
            comments: [],
            createdBy: createdBy,
            assignedUsersList: assignedUsersList
        }

        await addDocument(project)
        if (!response.error) {
            navigate("/")
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name of a Project:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>

                <label>
                    <span>Project category:</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign project to:</span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                {formError && <div className="error">{formError}</div>}
                <button className="btn">Add project</button>
            </form>
        </div>
    )
}
