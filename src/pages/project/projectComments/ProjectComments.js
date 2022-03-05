import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// firebase
import { timestamp } from "../../../firebase/config";
// hooks
import { useFirestore } from "../../../hooks/useFirestore";
// context
import { useAuthContext } from "../../../hooks/useAuthContext";
// components
import Avatar from "../../../components/avatar/Avatar";

export default function ProjectComments({ project }) {
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore("projects")
    const [newComment, setNewComment] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random() // this is not great but will work fine
        }

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!response.error) {
            setNewComment("")
        }
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment-content">
                            {comment.content}
                        </div>
                    </li>
                ))
                }
            </ul>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new Comment</span>
                    <textarea
                        required
                        onChange={e => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}
