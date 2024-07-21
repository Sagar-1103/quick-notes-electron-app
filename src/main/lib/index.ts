import { appDirectoryName, fileEncoding, welcomeFileName } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote } from '@shared/types'
import { app } from 'electron'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'

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
    if (isEmpty(notes)) {
      const resourcesPath = app.getAppPath()
      const welcomeFilePath = path.join(resourcesPath, 'resources', welcomeFileName)
      const content = await readFile(welcomeFilePath, { encoding: fileEncoding })

      await writeFile(`${rootDir}/${welcomeFileName}`, content, { encoding: fileEncoding })
    }
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

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  // console.info(`Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}
