import { ActionButton, ActionButtonProps } from '@/components'
import { FilePenLine } from 'lucide-react'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <FilePenLine className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
