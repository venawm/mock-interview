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
import { ChevronDown, Home, Loader2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [linkIndex, setLinkIndex] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();
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
        const total =
          res.reduce((acc, item) => acc + parseFloat(item.rating), 0) /
          res.length;
        setRating(total);
      }
    } catch (error) {
      toast.error("Error fetching data, please contact the administrator");
    }
  };

  const returnBgClass = (rating) => {
    if (rating < 4) {
      return "bg-red-500";
    } else if (rating >= 4 && rating < 8) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };

  const handleClick = (index) => {
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
        <p className="text-lg flex gap-1 items-center">
          Overall Rating:
          <strong
            className={`text-${returnBgClass(rating).replace("bg-", "")}`}
          >
            {rating ? (
              <>{rating}/10</>
            ) : (
              <>
                <Loader2Icon className=" animate-spin" />
              </>
            )}
          </strong>
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
                className="text-left p-4 border border-slate-100 bg-slate-50 text-slate-800 shadow-sm rounded-md w-full flex justify-between items-center"
                onClick={() => handleClick(index)}
              >
                {item.question}
                <motion.p
                  animate={{ rotate: linkIndex.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="transition-all"
                >
                  <ChevronDown />
                </motion.p>
              </CollapsibleTrigger>
              <AnimatePresence initial={false}>
                {linkIndex.includes(index) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <CollapsibleContent className="flex flex-col gap-4 transition">
                      <div className="flex items-start gap-2">
                        <motion.p
                          className={`${returnBgClass(
                            item.rating
                          )} shadow-sm rounded-full w-16 h-16 text-white text-md font-bold relative flex justify-center items-center p-4 `}
                          transition={{ duration: 0.5 }}
                        >
                          {item.rating}/10
                        </motion.p>
                        <p className="text-left p-4 border border-slate-100 bg-green-100 text-primary shadow-sm rounded-md w-full">
                          {item.UserAnswer}
                        </p>
                      </div>
                      <p className="text-left p-4 border border-slate-100 bg-blue-100 text-blue-900 shadow-sm rounded-md w-full">
                        <strong>Feedback:</strong> {item.feedback}
                      </p>
                      <p className="text-left p-4 border border-slate-100 bg-yellow-100 text-yellow-600 shadow-sm rounded-md w-full">
                        <strong>
                          {item.rating > 7 ? (
                            <> Answer:</>
                          ) : (
                            <>Better Answer:</>
                          )}
                        </strong>{" "}
                        {item.correctAnswer}
                      </p>
                    </CollapsibleContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Collapsible>
          ))}
        </div>
      </section>
      <Button className="mt-4" onClick={() => router.replace("/dashboard")}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default Feedback;
