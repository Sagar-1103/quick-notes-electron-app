import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote } from '@shared/types'
import { ensureDir, readdir, readFile, stat } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  try {
    const rootDir = getRootDir()
    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
      withFileTypes: false,
      encoding: fileEncoding
    })

    const notes = notesFileNames.filter((filename) => filename.endsWith('.md'))
    return Promise.all(notes.map(getNoteInfoFromFileName))
  } catch (error) {
    throw new Error('Couldnt get notes from system')
  }
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${fileName}.md`, { encoding: fileEncoding })
}
