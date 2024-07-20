import { cn, formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: Boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)
  return (
    <div
      {...props}
      className={cn('cursor-pointer px-2.5 py-3 transition-colors duration-75', {
        'bg-zinc-400/75': isActive,
        'hover:bg-zinc-500/75': !isActive,
        className
      })}
    >
      <h3 className="mb-1 truncate font-bold">{title}</h3>
      <span className="inline-block w-full text-xs font-light text-left">{date}</span>
    </div>
  )
}
