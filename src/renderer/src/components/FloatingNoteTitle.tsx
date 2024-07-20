import { selectedNoteState } from '@renderer/store'
import { ComponentProps } from 'react'
import { useRecoilValue } from 'recoil'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const title = useRecoilValue(selectedNoteState)?.title
  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="tex-gray-400">{title}</span>
    </div>
  )
}
