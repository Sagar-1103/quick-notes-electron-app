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

export const createEmptyNoteState = selector({
  key: 'Create Note',
  get: ({}) => {
    return null
  },
  set: ({ get, set }) => {
    const notes = get(notesState)
    const title = `Note ${notes.length + 1}`
    const newNote: NoteInfo = {
      title,
      lastEditTime: Date.now()
    }

    set(notesState, [newNote, ...notes.filter((note) => note.title != newNote.title)])

    set(selectedNoteIndexState, 0)
  }
})

export const deleteNoteState = selector({
  key: 'Delete Note',
  get: ({}) => {
    return null
  },
  set: ({ get, set }) => {
    const notes = get(notesState)
    const selectedNote = get(selectedNoteState)
    if (!selectedNote) return
    set(notesState, [...notes.filter((note) => note.title != selectedNote.title)])

    set(selectedNoteIndexState, 0)
  }
})
