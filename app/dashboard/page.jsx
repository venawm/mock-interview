"use client";
import AddNewInterview from "@/components/dashboard/AddNewInterview";
import InterviewList from "@/components/interview/InterviewList";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

const Dashboard = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      if (!result) {
        toast.error(
          "An error occurred while connecting to the database. Please contact the administrator."
        );
        return;
      }

      setInterviewList(result);
    } catch (error) {
      toast.error(
        "An error occurred while fetching your interviews. Please contact the administrator if this issue persists."
      );
      console.error(error);
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2>Start Your Own AI Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview interviewList={interviewList} />
      </div>
      <InterviewList interviewList={interviewList} />
    </div>
  );
};

export default Dashboard;
