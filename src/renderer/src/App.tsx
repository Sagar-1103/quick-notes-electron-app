import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  Loader,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useEffect, useRef, useState } from 'react'
import { RecoilRoot } from 'recoil'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const resetScroll = () => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <RecoilRoot>
      <DraggableTopBar />
      {!isLoading ? (
        <RootLayout>
          <Sidebar className="p-2">
            <ActionButtonsRow className="flex justify-between mt-1" />
            <NotePreviewList onSelect={resetScroll} className="mt-3 space-y-1 " />
          </Sidebar>
          <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
            <FloatingNoteTitle className="pt-2" />
            <MarkdownEditor />
          </Content>
        </RootLayout>
      ) : (
        <Loader />
      )}
    </RecoilRoot>
  )
}
export default App
