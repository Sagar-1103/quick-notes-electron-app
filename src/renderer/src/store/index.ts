import { NoteInfo } from '@shared/models'
import { atom, selector } from 'recoil'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesStateAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>({
  key: 'Notes Async',
  default: loadNotes()
})

export const notesState = selector({
  key: 'Notes',
  get: async ({ get }) => {
    const notes = await get(notesStateAsync)
    return notes ? notes : null
  },
  set: async ({}) => {
    return null
  }
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

    if (selectedNoteIndex == null || !notes) return null

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
    if (!notes) return
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
    if (!selectedNote || !notes) return
    set(notesState, [...notes.filter((note) => note.title != selectedNote.title)])

    set(selectedNoteIndexState, 0)
  }
})
