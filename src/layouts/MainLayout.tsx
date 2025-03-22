import Header from "../components/Header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default MainLayout