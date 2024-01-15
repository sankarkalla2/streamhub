"use client"

import { Input } from "@/components/ui/input";
import CopyBotton from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="p-6 bg-muted rounded-xl">
      <div className="flex items-center gap-x-10">
        <h1 className="font-semibold truncate shrink-0">Stream Key</h1>
        <div className="flex flex-col w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              disabled
              type={show ? "text" : "password"}
              value={value || ""}
              placeholder="Stream Key"
            />
            <CopyBotton value={value || ""} />
          </div>
        </div>
      </div>
      <Button
        size="sm"
        variant="link"
        className="pl-32"
        disabled={value === ""}
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "Show"}
      </Button>
    </div>
  );
};

export default KeyCard;
