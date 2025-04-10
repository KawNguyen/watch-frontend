import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
      </Route>
      <Route path="/*" element={<NotFoundPage/>}/>

    </Routes>
  )
}

export default App