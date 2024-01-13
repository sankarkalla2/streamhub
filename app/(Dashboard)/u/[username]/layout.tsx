import { getSelfByUserName } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./(home)/_components/navbar";
import Sidebar from "./(home)/_components/sidebar";
import Container from "./(home)/_components/container";

interface DashboardLayoutProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}
const DashboardLayout = async ({ params, children }: DashboardLayoutProps) => {
  const self = await getSelfByUserName(params.username);
  if (!self) redirect("/");
  return (
    <>
      <Navbar />
      <div className="pt-20 flex h-full">
        <Sidebar />
        <Container>{children}</Container>
      </div>
      ;
    </>
  );
};

export default DashboardLayout;
