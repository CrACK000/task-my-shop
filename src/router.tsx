import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Dashboard from "routes@/dashboard.tsx";
import {Layout} from "routes@/layout.tsx";
import {Products} from "routes@/products.tsx";
import {Product} from "routes@/product.tsx";
import "./assets/style.css"
import {Login} from "routes@/login.tsx";
import {NotFound} from "component@/global/NotFound.tsx";

function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/products/:productId",
          element: <Product />
        },
        {
          path: "*",
          element: <NotFound title="Page Not Found" message="404"/>,
        }
      ]
    }
  ])

  return <RouterProvider router={router}/>
}

export default Router
