import { Footer } from "../components/Footer";
import { Scene } from "../Scene";

export const Player = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <Scene />

      <Footer showControls />
    </div>
  );
};
