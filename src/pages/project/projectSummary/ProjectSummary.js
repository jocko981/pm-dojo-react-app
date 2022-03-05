import React from "react";
import { useNavigate } from "react-router-dom";

// hooks
import { useFirestore } from "../../../hooks/useFirestore";
// context
import { useAuthContext } from "../../../hooks/useAuthContext";
// components
import Avatar from "../../../components/avatar/Avatar";

export default function ProjectSummary({ project }) {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { deleteDocument } = useFirestore("projects")

    const handleClick = () => {
        deleteDocument(project.id)
        navigate("/")
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p>Project created by: {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id &&
                <button className="btn" onClick={handleClick}>Delete Project (it's completed)</button>
            }
        </div>
    )
}
