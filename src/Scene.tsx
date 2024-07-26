import { Box } from "./components/animatable/Box";

export const Scene = () => {
  return (
    <div className="scene p-8 flex flex-col gap-2">
      <Box name="box1" className="bg-pink-500" />
      <Box name="box2" className="bg-amber-500" />
      <Box name="box3" className="bg-cyan-500" />
    </div>
  );
};
