import { useLottie } from 'lottie-react'
import NoteLoader from './../assets/NoteLoader.json'

export const Loader = () => {
  const options = {
    animationData: NoteLoader,
    loop: true
  }
  const { View } = useLottie(options)

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 h-96">{View}</div>
    </div>
  )
}
