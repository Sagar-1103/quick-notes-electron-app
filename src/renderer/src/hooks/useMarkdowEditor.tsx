import { MDXEditorMethods } from '@mdxeditor/editor'
import { notesState, selectedNoteState } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { throttle } from 'lodash'
import { useRef } from 'react'
import { useRecoilState } from 'recoil'

export const useMarkdowEditor = () => {
  const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteState)
  const [notes, setNotes] = useRecoilState(notesState)
  const editorRef = useRef<MDXEditorMethods>(null)

  const savingNote = async (newContent: NoteContent) => {
    if (!notes || !selectedNote) return

    await window.context.writeNote(selectedNote.title, newContent)

    const updatedNotes = notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
    setNotes(updatedNotes)
  }

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      await savingNote(content)
    },
    autoSavingTime,
    { leading: false, trailing: true }
  )

  const handleBlur = async () => {
    if (!selectedNote) return
    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await savingNote(content)
    }
  }

  return {
    selectedNote,
    handleBlur,
    handleAutoSaving,
    editorRef
  }
}
