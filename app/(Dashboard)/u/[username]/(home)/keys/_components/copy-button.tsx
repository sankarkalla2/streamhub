"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy, CheckIcon } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

const CopyBotton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button disabled={value === "" || isCopied} onClick={onCopy} size="sm" variant='ghost'>
      <Icon />
    </Button>
  );
};

export default CopyBotton;
