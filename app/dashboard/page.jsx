"use client";
import AddNewInterview from "@/components/dashboard/AddNewInterview";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2>Start Your Own AI Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default Dashboard;
