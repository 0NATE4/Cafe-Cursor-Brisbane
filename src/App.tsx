import { Navigate, Route, Routes } from "react-router-dom";
import { BoardPage } from "./pages/BoardPage";
import { DetailPage } from "./pages/DetailPage";
import { IdeaSparkPage } from "./pages/IdeaSparkPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardPage />} />
      <Route path="/spark" element={<IdeaSparkPage />} />
      <Route path="/c/:slug" element={<DetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
