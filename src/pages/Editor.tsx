import studio from "@theatre/studio";
import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Scene } from "../Scene";

studio.initialize();

export const Editor = () => {
  useEffect(() => {
    studio.ui.restore();

    return () => {
      studio.ui.hide();
    };
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      <Scene />

      <Footer />
    </div>
  );
};
