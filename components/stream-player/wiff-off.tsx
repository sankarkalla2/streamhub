import { WifiOff } from "lucide-react";

interface WiffOffProps {
  username: string;
}

const WiffOff = ({ username }: WiffOffProps) => {
  return (
    <div className="h-full flex items-center justify-center flex-col text-muted-foreground">
      <WifiOff className="w-10 h-10" />
      {username} is offline
    </div>
  );
};

export default WiffOff;
