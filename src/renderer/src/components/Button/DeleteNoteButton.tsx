import { ActionButton, ActionButtonProps } from '@/components'
import { deleteNoteState } from '@renderer/store'
import { Trash2 } from 'lucide-react'
import { useRecoilCallback } from 'recoil'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useRecoilCallback(({ set }) => () => {
    set(deleteNoteState, null)
  })

  const handleDelete = () => {
    deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <Trash2 className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
