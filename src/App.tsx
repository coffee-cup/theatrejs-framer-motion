import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Editor } from "./pages/Editor";
import { Player } from "./pages/Player";
import { AnimationContextProvider } from "./project";

import state from "./states/state1.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Player />,
  },
  {
    path: "/editor",
    element: <Editor />,
    // element: <div>Editor</div>,
  },
]);

const App = () => {
  return (
    <main className="flex flex-col items-center justify-center p-20 bg-stone-950 text-white min-h-screen min-w-[100vw]">
      <h1 className="text-lg font-semibold pt-12 px-12 mb-4">
        theatre.js + framer motion.
      </h1>

      <div className="grid w-full max-w-4xl mb-40 min-h-[520px] rounded bg-stone-900 border-2 border-stone-800">
        <AnimationContextProvider sheetName="Scene 1" state={state}>
          <RouterProvider router={router} />
        </AnimationContextProvider>
      </div>
    </main>
  );
};

export default App;
