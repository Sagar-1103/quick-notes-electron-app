import { noteMock } from '@/store/mocks'
import { NoteInfo } from '@shared/models'
import { atom, selector } from 'recoil'

export const notesState = atom<NoteInfo[]>({
  key: 'Notes',
  default: noteMock
})

export const selectedNoteIndexState = atom<number | null>({
  key: 'Selected Note Id',
  default: null
})

export const selectedNoteState = selector({
  key: 'Selected Note',
  get: ({ get }) => {
    const notes = get(notesState)
    const selectedNoteIndex = get(selectedNoteIndexState)

    if (selectedNoteIndex == null) return null

    const selectedNote = notes[selectedNoteIndex]

    return {
      ...selectedNote,
      content: `Hello from Note ${selectedNoteIndex}`
    }
  }
})
