"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { useEffect, useState, useTransition, useRef, ElementRef } from "react";

import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";
import { IngressInput } from "livekit-server-sdk";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
  const [mounted, setisMounted] = useState(false);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();
  const elementRef = useRef<ElementRef<"button">>(null);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!mounted) return null;

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("ingress created");
          elementRef.current?.click();
        })
        .catch((err: any) => {
          console.log(err);
          toast.error("something went wrong");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary">Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Genrate Connection</DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-full mb-2">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will reset all active streams with connect with current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between items-center">
          <DialogClose asChild ref={elementRef}>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            disabled={isPending}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
