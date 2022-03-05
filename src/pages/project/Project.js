import { useParams } from "react-router-dom";
// styles
import "./Project.css";
// hooks
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "./projectSummary/ProjectSummary";
import ProjectComments from "./projectComments/ProjectComments";

export default function Project() {
    const { id } = useParams()
    const { document, error } = useDocument("projects", id)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="project-details">
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    )
}
