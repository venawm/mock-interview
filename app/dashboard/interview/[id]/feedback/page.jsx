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
import { ChevronDown } from "lucide-react";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [linkIndex, setLinkIndex] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.id))
        .orderBy(UserAnswer.id);
      if (res.length === 0) {
        toast.error("No data found for the given interview ID.");
      } else {
        setFeedbackList(res);
      }
    } catch (error) {
      toast.error("Error fetching data, please contact the administrator");
      console.log(error);
    }
  };
  const reutrnBg = (rating = 0) => {
    if (rating < 4) {
      return "bg-red-500";
    } else if (rating >= 4 && rating < 8) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };

  const handleCLick = (index) => {
    setLinkIndex((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
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
        <div className="flex flex-col gap-4 justify-center">
          {feedbackList.map((item, index) => (
            <Collapsible
              key={index}
              className="transition-all w-full flex flex-col gap-2"
            >
              <CollapsibleTrigger
                className="text-left p-4 border border-slate-100 bg-slate-50 text-slate-800 shadow-sm rounded-md w-full flex justify-between"
                onClick={() => handleCLick(index)}
              >
                {item.question}
                <p
                  className={`${
                    linkIndex.includes(index) ? "rotate-180" : ""
                  } transition-all`}
                >
                  <ChevronDown />
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-4 transition ">
                <div className="flex items-start gap-2">
                  <p
                    className={`${reutrnBg(
                      item.rating
                    )} shadow-sm rounded-full w-16 h-16 text-white text-md font-bold relative flex justify-center items-center p-4`}
                  >
                    {item.rating}/10
                  </p>
                  <p className="text-left p-4 border border-slate-100 bg-green-100 text-primary shadow-sm rounded-md w-full">
                    {item.UserAnswer}
                  </p>
                </div>
                <p className="text-left p-4 border border-slate-100 bg-blue-100 text-blue-900 shadow-sm rounded-md w-full">
                  <strong>Feedback:</strong> {item.feedback}
                </p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
