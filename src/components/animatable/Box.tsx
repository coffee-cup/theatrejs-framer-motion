import { motion } from "framer-motion";
import { useTheaterFramerObject } from "../../project";
import { cn } from "../../utils";

export const Box = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const { values } = useTheaterFramerObject(name);

  return (
    <motion.div
      style={values}
      className={cn("w-12 h-12 bg-pink-500 rounded", className)}
    />
  );
};
