import { useState, useEffect } from "react";
// firebase
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";
// context
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error("Could not complete signup")
      }

      // we need to upload the image before we updateProfile() function
      // upload user thumbnail img, handle folder structure
      const uploadThumbnailPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const imgUploadRes = await projectStorage.ref(uploadThumbnailPath).put(thumbnail)
      const imgUrl = await imgUploadRes.ref.getDownloadURL()

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      // create a user document
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName: displayName,
        photoURL: imgUrl
      })

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}