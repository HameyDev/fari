import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import MusicPlayer from "./components/MusicPlayer";
import Welcome from "./components/Welcome";
import HeartLock from "./components/HeartLock";
import LoveLetter from "./components/LoveLetter";
import Memories from "./components/Memories";
import Promises from "./components/Promises";
import Destiny from "./components/Destiny";
import HeartDashboard from "./components/HeartDashboard";






export default function App() {
  const [stage, setStage] = useState(1);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-darkbg">

      

      {/* Music player (can be fixed or absolute) */}
      <MusicPlayer />

      {/* Main screens */}
      <AnimatePresence mode="wait">
        {stage === 1 && <Welcome next={() => setStage(2)} />}
        {stage === 2 && <HeartLock back={() => setStage(1)} unlock={() => setStage(3)} />}
        {stage === 3 &&
          <HeartDashboard
            openSection={(id) => {
              if (id === "message") setStage(4);
              if (id === "details") setStage(5);
              if (id === "snap") setStage(6);
              if (id === "surprise") setStage(7);
            }}
            exit={() => setStage(2)}
          />
        }
        {stage === 4 && <LoveLetter exit={() => setStage(3)} next={() => setStage(5)} />}
        {stage === 5 && <Memories next={() => setStage(6)} back={() => setStage(3)} />}
        {stage === 6 && <Promises next={() => setStage(7)} back={() => setStage(3)} />}
        {stage === 7 && <Destiny back={() => setStage(3)} />}
      </AnimatePresence>

    </div>
  );
}

