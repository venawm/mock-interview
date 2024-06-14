import Header from "@/components/navigation/Header";
import React from "react";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Toaster />
      <Header />
      <div className="p-6 px-4 md:px-12">{children}</div>
    </div>
  );
};

export default DashboardLayout;
