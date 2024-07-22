import { ActionButton, ActionButtonProps } from '@/components'
import { notesState, selectedNoteIndexState, selectedNoteState } from '@renderer/store'
import { Trash2 } from 'lucide-react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const [notes, setNotes] = useRecoilState(notesState)
  const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteState)
  const selectedNoteIndex = useSetRecoilState(selectedNoteIndexState)

  const handleDelete = async () => {
    if (!selectedNote || !notes.length) return

    const isDeleted = await window.context.deleteNote(selectedNote.title)

    if (!isDeleted) return

    setNotes([...notes.filter((note) => note.title !== selectedNote.title)])
    selectedNoteIndex(null)
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <Trash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
