import { NavLink } from "react-router-dom";
import { cn } from "../utils";
import { useEffect, useState } from "react";
import { useProject } from "../project";

export const Footer = ({ showControls }: { showControls?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { project, sheet } = useProject();

  useEffect(() => {
    const play = async () => {
      console.log("project", project);
      await project.ready;

      if (isPlaying) {
        sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
      } else {
        sheet.sequence.pause();
      }
    };

    play();

    return () => {
      sheet.sequence.pause();
    };
  }, [isPlaying, project]);

  return (
    <footer className="flex items-center justify-between bg-stone-800 px-2 py-1 text-sm font-mono">
      <div className="flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn([
              "px-4 text-stone-500 hover:underline",
              "border-r border-stone-700",
              isActive && "text-stone-50",
            ])
          }
        >
          Player
        </NavLink>

        <NavLink
          to="/editor"
          className={({ isActive }) =>
            cn([
              "px-4 text-stone-500 hover:underline",
              isActive && "text-stone-50",
            ])
          }
        >
          Editor
        </NavLink>
      </div>

      {showControls && (
        <div className="">
          <label className="flex gap-2 items-center select-none">
            <p className="text-stone-500">Play</p>
            <input
              type="checkbox"
              onChange={(e) => {
                setIsPlaying(e.target.checked);
              }}
            />
          </label>
        </div>
      )}
    </footer>
  );
};
