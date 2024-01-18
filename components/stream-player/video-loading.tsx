import { Loader } from "lucide-react";

interface VideoLoadingProps {
  label: string;
}

const VideoLoading = ({ label }: VideoLoadingProps) => {
  return (
    <div className="h-full flex items-center justify-center flex-col text-muted-foreground">
      {label}
      <Loader className="animate-spin" />
    </div>
  );
};

export default VideoLoading;
