import { useState,useEffect,useRef } from 'react'

import { Button } from './components/ui/button'
import { Card,CardContent } from './components/ui/card'
import { Textarea } from './components/ui/textarea'
import { Slider } from './components/ui/slider'
import { ThemeProvider } from "@/components/ui/ThemeProvider"
import { ModeToggle } from './Toggle'
import './App.css'

function App() {
  const [inputText, setInputText] = useState("")
  const [isScrolling, setIsScrolling] = useState(false)
  const teleprompterRef = useRef<HTMLDivElement>(null)
  const [scrollSpeed, setScrollSpeed] = useState(1.5)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [textSize, setTextSize] = useState(32); 
  
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
  }, [isScrolling,scrollSpeed])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }
const handleSliderChange = (value:any) => {
    setTextSize(value);
  };

  const handleToggleScroll = () => {
    setIsScrolling(!isScrolling)
  }
  const handleSpeedChange = (value:any) => {
    setScrollSpeed(Number(value)) // Cambiar la velocidad
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle /> 
    <div className="container mx-auto p-4 w-full">
      <div className="flex flex-col place-content-between mx-auto w-full  ">
     <img src="/cat.svg" alt=""  className=" rotate-0 h-24 scale-100 transition-all dark:-rotate-90 dark:hidden"/>
        <img src="/catcopy.svg" alt=""  className="rotate-90 h-24 hidden  transition-all dark:rotate-0 dark:block"/>
       
      <h1 className="text-2xl font-bold mb-4">TELEPROMPT</h1>
      </div>
      
    <h2 className="text-l mb-4">Introduce tu texto, ajusta tu fuente y velocidad, y suerte con la grabacion </h2>
   
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
        <Slider
          
          min={1}
          max={3}
          step={0.5}
          value={[scrollSpeed]}
          onValueChange={(value)=>handleSpeedChange(value[0])}
          className="w-full mb-9"
        />
         <label htmlFor="size" className="block mb-2 font-semibold">
          Fuente: {textSize} px
        </label>
        <Slider
         value={[textSize]} 
        min={12} // Valor mínimo del slider (10px)
        max={72} // Valor máximo del slider (50px)
        step={4} // Incremento del slider
        onValueChange={(value) => handleSliderChange(value[0])}
        />
      </div>
    <Card className={`w-full bg-black border-4 border-violet-600 ${isFullScreen ? 'fixed top-0 left-0 w-full h-full z-40 ' : 'relative'}`}>
      <CardContent className="p-0">
      {isFullScreen && (
          <Button onClick={handleToggleFullScreen} className="absolute top-4 left-4">
           Salir Pantalla Completa
          </Button>
        )}

        <div
          ref={teleprompterRef}
          className="h-96 overflow-hidden text-center"
        >
          <div className="text-white p-4 whitespace-pre-wrap" style={{ 
          fontSize: `${textSize}px`, }}>
            {inputText}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  </ThemeProvider>
  )
}

export default App
