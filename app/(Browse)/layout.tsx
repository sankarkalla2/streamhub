import React, { Suspense } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Container from "./_components/container";
import { RecommnedSkeleton } from "./_components/sidebar/user-item";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<RecommnedSkeleton />}> 
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
      ;
    </div>
  );
};

export default BrowseLayout;
