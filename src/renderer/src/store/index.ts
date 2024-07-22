import { NoteInfo } from '@shared/models'
import { atom } from 'recoil'

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
