import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/pokemon/:name" element={<DetailsPage />} />
    </Routes>
  );
}
