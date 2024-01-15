import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CopyBotton from "./copy-button";

interface UrlCardProps {
  value: string | null;
}
const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className="w-full p-6 bg-muted rounded-xl">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="w-full space-y-2">
          <div className="w-full flex items-center gap-x-2">
            <Input disabled placeholder="server url" value={value || ""} />
            <CopyBotton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
