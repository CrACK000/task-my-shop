import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/react";
import {SunMoon} from "lucide-react";
import {useTheme} from "next-themes";

// switch button on dark mode / theme
export const ButtonSwitchTheme = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <SunMoon className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={`Selected theme ${theme}`}>
        <DropdownItem key="light" onClick={() => setTheme('light')}>Light</DropdownItem>
        <DropdownItem key="dark" onClick={() => setTheme('dark')}>Dark</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}