import {
  getProject,
  IProject,
  ISheet,
  types,
  UnknownShorthandCompoundProps,
} from "@theatre/core";
import { useMotionValue } from "framer-motion";
import { createContext, useContext, useEffect, useMemo } from "react";

// project.ready.then(() => {
//   sheet.sequence.play({
//     iterationCount: Infinity,
//     direction: "alternate",
//     range: [0, 2],
//   });
// });

interface AnimationProject {
  project: IProject;
  sheet: ISheet;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimationProjectContext = createContext<AnimationProject>({} as any);

export const AnimationContextProvider = ({
  sheetName,
  state,
  children,
}: {
  sheetName: string;
  state?: unknown;
  children: React.ReactElement;
}) => {
  const project = useMemo(
    () => getProject(`${sheetName} Project`, { state }),
    [sheetName, state]
  );
  const sheet = useMemo(() => project.sheet(sheetName), [project, sheetName]);

  return (
    <AnimationProjectContext.Provider
      value={{
        project,
        sheet,
      }}
    >
      {children}
    </AnimationProjectContext.Provider>
  );
};

export const useProject = () => useContext(AnimationProjectContext);

export const useTheaterObject = (
  objectName: string,
  props: UnknownShorthandCompoundProps
) => {
  const { sheet } = useProject();
  const obj = useMemo(() => {
    sheet.detachObject(objectName);
    return sheet.object(objectName, props);
  }, [sheet, objectName, props]);

  return obj;
};

export const useTheaterFramerObject = (objectName: string) => {
  const props = useMemo(
    () =>
      ({
        x: 0,
        y: 0,
        opacity: types.number(1, { range: [0, 1] }),
      } as UnknownShorthandCompoundProps),
    []
  );

  const obj = useTheaterObject(objectName, props);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);

  useEffect(() => {
    return obj.onValuesChange((values) => {
      x.set(values.x);
      y.set(values.y);
      opacity.set(values.opacity);
    });
  }, [obj]);

  const values = { x, y, opacity };

  return { values };
};
