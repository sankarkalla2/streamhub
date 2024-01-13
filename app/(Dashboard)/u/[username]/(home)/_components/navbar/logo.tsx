import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 justify-start text-left flex-1">
        <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
          <Image src="/spooky.svg" height={32} width={32} alt="StreamHub" />
        </div>
        <div className="">
          <p className={cn('font-bold text-lg')}>StreamHub</p>
          <p className="text-sm text-muted-foreground">Creator Dashboard</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
