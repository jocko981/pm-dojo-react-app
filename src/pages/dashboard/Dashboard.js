import { useState } from "react";

// styles
import "./Dashboard.css";
// hooks
import { useCollection } from "../../hooks/useCollection";
// context
import { useAuthContext } from "../../hooks/useAuthContext";
// components
import ProjectList from "../../components/projectList/ProjectList";
import ProjectFilter from "./projectFilter/ProjectFilter";
// consts
const FILTER_LIST = ["all", "mine", "development", "design", "marketing", "sales"]

export default function Dashboard() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection("projects")
    const [currentFilter, setCurrentFilter] = useState(FILTER_LIST[0])

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const filteredProjects = documents
        ? documents.filter((doc) => {
            switch (currentFilter) {
                case "all":
                    return true
                case "mine":
                    let assignedToMe = false
                    doc.assignedUsersList.forEach((u) => {
                        if (user.uid === u.id) {
                            assignedToMe = true
                        }
                    })
                    return assignedToMe
                case "development":
                case "design":
                case "sales":
                case "marketing":
                    return doc.category === currentFilter
                default:
                    return true
            }
        })
        : null


    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
            {filteredProjects && <ProjectList projects={filteredProjects} />}
        </div>
    )
}
