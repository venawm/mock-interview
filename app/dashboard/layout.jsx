import Header from "@/components/navigation/Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Toaster />
      <Header />
      <div className="p-6 px-6 md:px-24 lg:px-38 pt-20">{children}</div>
    </div>
  );
};

export default DashboardLayout;
