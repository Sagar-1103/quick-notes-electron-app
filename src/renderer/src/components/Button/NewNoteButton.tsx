import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteState } from '@renderer/store'
import { PlusSquareIcon } from 'lucide-react'
import { useRecoilCallback } from 'recoil'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useRecoilCallback(({ set }) => () => {
    set(createEmptyNoteState, null)
  })

  const handleCreation = () => {
    createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <PlusSquareIcon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
