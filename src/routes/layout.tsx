import NavBar from "component@/layout/NavBar.tsx";
import {Outlet} from "react-router-dom";

export function Layout() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}