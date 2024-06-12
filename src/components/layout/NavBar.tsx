import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/navbar";
import {Link} from "@nextui-org/react";
import {ShoppingBag} from "lucide-react";
import React from "react";
import {useMatch} from "react-router-dom";
import {ButtonSwitchTheme} from "component@/layout/ButtonSwitchTheme.tsx";

function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link href="/" color="foreground">
          <ShoppingBag className="w-5 h-5 mr-2" />
          <p className="font-bold text-inherit">myShop</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={Boolean(useMatch("/dashboard"))}>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={Boolean(useMatch("/products/*"))}>
          <Link color="foreground" href="/products">
            Catalog
          </Link>
        </NavbarItem>
        <NavbarItem isActive={Boolean(useMatch("/login"))}>
          <Link color="foreground" href="/login">
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ButtonSwitchTheme />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem isActive={Boolean(useMatch("/dashboard"))}>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={Boolean(useMatch("/products/*"))}>
          <Link href="/products">
            Catalog
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={Boolean(useMatch("/login"))}>
          <Link href="/login">
            Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default NavBar