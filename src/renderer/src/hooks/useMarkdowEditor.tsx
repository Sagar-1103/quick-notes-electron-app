import { selectedNoteState } from '@renderer/store'
import { useRecoilValue } from 'recoil'

export const useMarkdowEditor = () => {
  const selectedNote = useRecoilValue(selectedNoteState)

  return {
    selectedNote
  }
}
