"use client";

import { Volume1Icon, Volume2Icon } from "lucide-react";
import { useState } from "react";
import Hint from "../ui/hint";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}
const VolumeControl = ({ onToggle, onChange, value }: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };
  const Icon = Volume1Icon;
  const label = isMuted ? "Unmute" : "Mute";
  return (
    <div className="flex items-center gap-2">
      <Hint side="left" asChild label={label}>
        <button onClick={onToggle} className="text-white rounded-lg">
          <Icon />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};

export default VolumeControl;
