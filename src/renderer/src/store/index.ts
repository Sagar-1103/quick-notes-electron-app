import { NoteInfo } from '@shared/models'
import { atom, selector } from 'recoil'

export const notesState = atom<NoteInfo[]>({
  key: 'Notes',
  default: []
})

export const selectedNoteIndexState = atom<number | null>({
  key: 'Selected Note Id',
  default: null
})

export const selectedNoteState = atom({
  key: 'Selected Note',
  default: {
    title: '',
    lastEditTime: Date.now(),
    content: ''
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
