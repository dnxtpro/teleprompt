import {Cat } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "./components/ui/switch"
import { useTheme } from "@/components/ui/ThemeProvider"
import {useState,useEffect} from 'react'

export function ModeToggle() {
  const { theme,setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark")
  useEffect(() => {
    setIsDarkMode(theme === "dark")  // Actualiza estado según el tema actual
  }, [theme])

  const handleThemeSwitch = (checked: boolean) => {
    setIsDarkMode(checked)
    setTheme(checked ? "dark" : "light") // Cambia tema según el switch
  }
  

  return (
    <div className="fixed right-0 top-0 z-50">
        <Switch
         checked={isDarkMode}
         onCheckedChange={handleThemeSwitch}
        />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Cat className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Cat className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
    </div>
  )
}
