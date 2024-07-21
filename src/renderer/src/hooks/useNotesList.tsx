import { notesState, selectedNoteIndexState, selectedNoteState } from '@renderer/store'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const [notes, setNotes] = useRecoilState(notesState)
  const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteState)
  const [selectedNoteIndex, setSelectedNoteIndex] = useRecoilState(selectedNoteIndexState)

  const loadNotes = async () => {
    const notes = await window.context.getNotes()

    setNotes(notes.sort((a, b) => b.lastEditTime - a.lastEditTime))
  }
  const loadContent = async () => {
    let cont: string
    if (selectedNoteIndex != null) {
      cont = await window.context.readNote(
        notes?.[selectedNoteIndex ? selectedNoteIndex : 0]?.title
      )
      const note = notes[selectedNoteIndex]

      const newSelectedNote = { ...note, content: cont }
      setSelectedNote(newSelectedNote)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  useEffect(() => {
    loadContent()
  }, [selectedNoteIndex])

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
