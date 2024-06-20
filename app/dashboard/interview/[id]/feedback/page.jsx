"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const res = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.id))
        .orderBy(UserAnswer.id);
      if (res.length === 0) {
        toast.error("Error fetching data, please contact the administrator");
      } else {
        setFeedbackList(res);
      }
    } catch (error) {
      toast.error("Error fetching data, please contact the administrator");
      console.log(error);
    }
  };
  return (
    <div className="p-4">
      <header>
        <h2 className="font-bold text-2xl mb-2">Your Interview Feedback</h2>
        <p className="text-lg">
          Overall Rating: <strong className="text-primary">7/10</strong>
        </p>
      </header>
      <section className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          Below are the interview questions along with your answers and
          feedback.
        </p>
        <div className="flex flex-col gap-4  justify-center">
          {feedbackList.map((item, index) => {
            return (
              <Collapsible key={index} className=" transition-all w-full">
                <CollapsibleTrigger className="text-left p-4 border border-slate-100 bg-slate-50 text-slate-800 shadow-sm rounded-md w-full">
                  {item.question}
                </CollapsibleTrigger>
                <CollapsibleContent>s</CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
