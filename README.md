# Theatre.js and Framer Motion

Small experiment using [theatre.js](https://www.theatrejs.com/) to create and sequence an animation that is rendered with [framer motion](https://www.framer.com/motion/).

![screenshot-2024-07-25-23 19 01@2x](https://github.com/user-attachments/assets/19331c2c-56ff-4e64-a0bf-da87094172a4)

## How it works

- Theatre.js studio editor is used on the `/editor` page to control all of the objects in the scene
- Objects are defined with the `useTheaterFramerObject(name: string)` hook. For example,

```tsx
export const Box = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  // Get MotionValue's that are connected to a theatre.js sheet
  const { values } = useTheaterFramerObject(name);

  return (
    <motion.div
      // Render the values in framer-motion
      style={values}
      className={cn("w-12 h-12 rounded", className)}
    />
  );
};
```

- React context provider that optionally takes a JSON file that was exported from the Theatre studio

```tsx
import state from "./states/state1.json";

// ...

<AnimationContextProvider sheetName="Scene 1" state={state}>
  </AnimationContextProvider>
</AnimationContextProvider>
```

## Animating more values

Currently only x, y, and opacity values are animatable. You can easily animate more values by
- adding them as a theatre prop
- Creating and updating a motion value for the new value
- Return the new motion value as part of the values object

Everything is defined in this hook

```tsx
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
```

## Things to note

- The Theatre studio is initialized globally when any page loads. Once loaded it will use the animations defined in local storage for the project/sheet. To ensure the values from the `state.json` file are used, comment out [this line](https://github.com/coffee-cup/theatrejs-framer-motion/blob/main/src/App.tsx#L15)
- HMR and Theatre.JS don't play nicely together. If the page goes blank after editing things in code, refresh the page.
