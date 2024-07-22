import { ActionButton, ActionButtonProps } from '@/components'
import { notesState, selectedNoteIndexState } from '@renderer/store'
import { NoteInfo } from '@shared/models'
import { PlusSquareIcon } from 'lucide-react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const [notes, setNotes] = useRecoilState(notesState)
  const setSelectedNoteIndex = useSetRecoilState(selectedNoteIndexState)

  const handleCreation = async () => {
    const title = await window.context.createNote()

    if (!title) return
    const newNote: NoteInfo = {
      title,
      lastEditTime: Date.now()
    }

    setNotes([newNote, ...notes.filter((note) => note.title != newNote.title)])

    setSelectedNoteIndex(0)
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <PlusSquareIcon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
