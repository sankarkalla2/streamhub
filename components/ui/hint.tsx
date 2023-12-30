import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface HintProps {
  side: "top" | "right" | "bottom" | "left";
  asChild: boolean;
  children: React.ReactNode;
  label: string;
  align?: "start" | "center" | "end"
}
const Hint = ({ side, asChild, children, label, align }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
        <TooltipContent align={align} className="bg-slate-700 text-white">
          <p className="text-sm font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
