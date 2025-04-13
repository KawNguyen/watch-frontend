import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ListProduct from "./pages/ListProduct";
import DetailProduct from "./pages/DetailProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ListProduct />} />
        <Route path="/products/:id" element={<DetailProduct />} />
      </Route>
    </Routes>
  );
};

export default App;
