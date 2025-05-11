import '@/App.css'
import Body from '@/components/Body'
import useMirageServer  from '@/hooks/useMirageServer';

function App() {
  useMirageServer()
  
  return (
    <>
    <Body />
    </>
  )
}

export default App
