import { useState, useEffect } from "react";
// firestore
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError("Such document doesn't exist")
            }
        }, (err) => {
            console.log("Get doc err", err)
            setError("Failed to get the document")
        })

        return () => unsub()
    }, [collection, id]);

    return { document, error }
}