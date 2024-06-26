"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { parse, isValid } from "date-fns";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

const InterviewList = ({ interviewList }) => {
  return (
    <div>
      <h2 className="font-medium text-xl">Your Interviews</h2>
      <div className="flex gap-4 flex-wrap-reverse mt-4">
        {interviewList?.map((item, index) => {
          const createdAtDate = parse(item.createdAt, "dd-MM-yyyy", new Date());
          return (
            <div
              key={index}
              className="p-4 border border-slate-200 rounded-md w-[300px] flex flex-col gap-1"
            >
              <h2 className="capitalize font-bold text-primary">
                {item.jobPosition}
              </h2>
              <h2 className="text-sm text-slate-700">
                {item.jobExp} Years of Experience
              </h2>
              <h2 className="text-xs">
                {isValid(createdAtDate)
                  ? timeAgo.format(createdAtDate)
                  : "Invalid date"}
              </h2>
              <div className="flex justify-between gap-2">
                <Link
                  href={`/dashboard/interview/${item.mockId}/feedback`}
                  className="w-2/3 bg-none"
                >
                  <Button
                    variant="secondary"
                    className="w-full text-primary border-2 border-primary bg-none hover:font-bold transition-all"
                  >
                    Feedback
                  </Button>
                </Link>
                <Link
                  className="w-1/3"
                  href={`/dashboard/interview/${item.mockId}/start`}
                >
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
