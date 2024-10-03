import { useState,useEffect,useRef } from 'react'

import { Button } from './components/ui/button'
import { Card,CardContent } from './components/ui/card'
import { Textarea } from './components/ui/textarea'
import './App.css'

function App() {
  const [inputText, setInputText] = useState("")
  const [isScrolling, setIsScrolling] = useState(false)
  const teleprompterRef = useRef<HTMLDivElement>(null)
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const [isFullScreen, setIsFullScreen] = useState(false)
  useEffect(() => {
    let animationFrameId: number

    const scroll = () => {
      if (teleprompterRef.current && isScrolling) {
        teleprompterRef.current.scrollTop += scrollSpeed 
        animationFrameId = requestAnimationFrame(scroll)
      }
    }

    if (isScrolling) {
      animationFrameId = requestAnimationFrame(scroll)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isScrolling])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const handleToggleScroll = () => {
    setIsScrolling(!isScrolling)
  }
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrollSpeed(Number(e.target.value)) // Cambiar la velocidad
  }
  const handleResetScroll = () => {
    if (teleprompterRef.current) {
      teleprompterRef.current.scrollTop = 0 // Resetea el scroll al inicio
    }
  }
  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen) // Alterna entre pantalla completa y modo normal
  }

  return (
    <div className="container mx-auto p-4 w-full">
    <h1 className="text-2xl font-bold mb-4">TELEPROMPT</h1>
    <h2 className="text-l mb-4">Introduce tu texto, </h2>
    <Textarea
      placeholder="Enter your text here..."
      value={inputText}
      onChange={handleInputChange}
      className="mb-4"
      rows={5}
    />
    <Button onClick={handleToggleScroll} className="m-4">
      {isScrolling ? "Stop" : "Start"} Teleprompter
    </Button>
    <Button onClick={handleResetScroll} className="m-4">
        Volver Al Principio
      </Button>
      <Button onClick={handleToggleFullScreen} className="mb-4">
        {isFullScreen ? "Exit Full Screen" : "Full Screen"}
      </Button>

    <div className="mb-4">
        <label htmlFor="speed" className="block mb-2 font-semibold">
          Velocidad: {scrollSpeed}
        </label>
        <input
          type="range"
          id="speed"
          min="1"
          max="3"
          value={scrollSpeed}
          onChange={handleSpeedChange}
          className="w-full"
        />
      </div>
    <Card className={`w-full bg-black border-4 border-red-600 ${isFullScreen ? 'fixed top-0 left-0 w-full h-full z-50' : 'relative'}`}>
      <CardContent className="p-0">
      {isFullScreen && (
          <Button onClick={handleToggleFullScreen} className="absolute top-4 right-4">
           Salir Pantalla Completa
          </Button>
        )}

        <div
          ref={teleprompterRef}
          className="h-96 overflow-hidden text-center"
        >
          <div className="text-white text-9xl p-4 whitespace-pre-wrap">
            {inputText}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default App
