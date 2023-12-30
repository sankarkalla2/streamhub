import React from "react";
import Logo from "./_components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col space-y-2">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
