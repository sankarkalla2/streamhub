"use client";

import { Maximize, Minimize } from "lucide-react";
import Hint from "../ui/hint";
import { Label } from "@radix-ui/react-select";

interface FullScreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}
export const FullScreenControl = ({
  isFullScreen,
  onToggle,
}: FullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Minimize" : "Maximize";

  return (
    <Hint label={label} asChild side="left">
      <button>
        <Icon className="h-5 w-5" onClick={onToggle} />
      </button>
    </Hint>
  );
};
