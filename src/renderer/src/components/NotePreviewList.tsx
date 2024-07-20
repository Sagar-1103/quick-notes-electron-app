import { NotePreview } from '@/components'
import { noteMock } from '@renderer/store/mocks'
import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (!noteMock.length) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {noteMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
