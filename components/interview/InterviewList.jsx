"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";

const InterviewList = () => {
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
      console.log(result);
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
      <h2 className="font-medium text-xl">Your Interviews</h2>
      <div className="flex gap-4 flex-wrap-reverse mt-4">
        {interviewList?.map((item, index) => {
          return (
            <div
              key={index}
              className=" p-4 border border-slate-200 rounded-md w-[300px] flex flex-col gap-1"
            >
              <h2 className="capitalize font-bold text-primary">
                {item.jobPosition}
              </h2>
              <h2 className="text-sm text-slate-700">
                {item.jobExp} Years of Experience
              </h2>
              <h2 className=" text-xs">{item.createdAt}</h2>
              <div className="flex justify-between gap-2">
                <Link
                  href={`/dashboard/interview/${item.mockId}/feedback`}
                  className="w-2/3 bg-none "
                >
                  <Button
                    variant="secondary"
                    className=" w-full text-primary border-2 border-primary bg-none hover:font-bold transition-all"
                  >
                    Feedback
                  </Button>
                </Link>

                <Link
                  className="w-1/3"
                  href={`/dashboard/interview/${item.mockId}/start`}
                >
                  {" "}
                  <Button className="w-full">Start</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewList;
