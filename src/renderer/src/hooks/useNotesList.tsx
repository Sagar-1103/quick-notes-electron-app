import { notesState, selectedNoteIndexState } from '@renderer/store'
import { useRecoilState, useRecoilValue } from 'recoil'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useRecoilValue(notesState)

  const [selectedNoteIndex, setSelectedNoteIndex] = useRecoilState(selectedNoteIndexState)

  const handleNoteSelect = async (index: number) => {
    setSelectedNoteIndex(index)
  }

  if (onSelect) {
    onSelect()
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
