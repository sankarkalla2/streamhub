import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const Logo = () => {
  return (
    <div className="flex flex-col items-center rounded-full justify-center gap-y-2">
      <div className="bg-white rounded-full p-1 items-center justify-center">
        <Image src="/spooky.svg" height={60} width={60} alt="Twich" />
      </div>
      <div className="flex flex-col p-0 items-center gap-0">
        <p className={cn("font-semibold text-xl" && font.className)}>
          StreamHub
        </p>
        <p className="text-muted-foreground text-sm p-0">Let&apos;s connect</p>
      </div>
    </div>
  );
};

export default Logo;
