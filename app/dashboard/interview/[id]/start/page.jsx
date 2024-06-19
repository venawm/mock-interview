"use client";

import QuestionSection from "@/components/interview/QuestionSection";
import RecordAnswer from "@/components/interview/RecordAnswer";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestion, setInterviewQuestion] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  useEffect(() => {
    getInterviewDetails();
  }, []);

  //   Get interview details from DB
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.id));
    const res = JSON.parse(result[0].jsonMockResp);
    setInterviewData(result[0]);
    setInterviewQuestion(res);
  };
  return (
    <div>
      <div className="flex flex-wrap-reverse py-20 gap-4 justify-center items-end">
        {/* Questions */}
        <QuestionSection
          interviewQuestion={interviewQuestion}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setUserAnswer={setUserAnswer}
          userAnswer={userAnswer}
          interviewData={interviewData}
          mockId={params.id}
        />
        {/* Webcam */}
        <RecordAnswer />
      </div>
    </div>
  );
};

export default StartInterview;
