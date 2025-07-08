import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/IntroPage";
import MapPage from "./components/MapPage";
import RiddlePage from "./components/RiddlePage";
import FinalChallenge from "./components/FinalChallenge";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter basename="/billys-quest">
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/intro/step3" element={<IntroPage step={3} />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/riddle/:id" element={<RiddlePage />} />
        <Route path="/final" element={<FinalChallenge />} />
      </Routes>
    </BrowserRouter>
  );
}
