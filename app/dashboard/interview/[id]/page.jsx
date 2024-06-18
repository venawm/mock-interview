"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, param } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Webcam from "react-webcam";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params);
    getInterviewDetails();
  }, []);

  //   Get interview details from DB
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.id));
    setInterviewData(result[0]);
  };

  return (
    <div className="flex flex-col justify-center gap-8">
      <h2 className="text-center font-bold text-2xl">Get Started</h2>
      <div className=" justify-center flex lg:justify-center   gap-4 lg:gap-12 flex-wrap-reverse">
        <div className=" flex flex-col gap-4">
          <div className="flex flex-col  gap-4 border p-4 rounded-md h-[200px]">
            <h2>
              <strong>Position: </strong>
              <span className=" capitalize">{interviewData?.jobPosition} </span>
            </h2>
            <h2>
              <strong>Description: </strong>
              <span className=" capitalize">{interviewData?.jobDesc} </span>
            </h2>
            <h2>
              <strong>Experience: </strong>
              <span className=" capitalize">{interviewData?.jobExp} </span>
            </h2>
          </div>
          <div className="bg-green-100 p-2 rounded-md text-primary">
            <h2 className="flex items-center gap-2">
              <Lightbulb />
              <strong>Info</strong>
            </h2>
            <h2 className="text-md max-w-[500px] text-justify">
              Please ensure your webcam and microphone are enabled by clicking
              the "Enable Webcam/microphone" button. Be prepared to answer
              technical questions related to{" "}
              <span className=" capitalize">{interviewData?.jobPosition} </span>
              , and have your resume and relevant project examples ready for
              reference. Note that we do not record any video or personal
              information. Your scores and feedback will be displayed at the end
              of the interview. This is an AI-powered mock interview, and the
              generated questions may have a margin of error. For any technical
              assistance, contact our support team.
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {webCamEnabled ? (
            <Webcam
              height={300}
              width={300}
              mirrored={true}
              onUserMedia={() => {
                setWebCamEnabled(true);
              }}
              onUserMediaError={() => [setWebCamEnabled(false)]}
              style={{
                borderRadius: 20,
              }}
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              <WebcamIcon
                size={228}
                className="text-slate-800 p-10 border rounded-md"
              />
              <Button
                variant="secondary"
                onClick={() => {
                  setWebCamEnabled(true);
                  console.log(interviewData);
                }}
                className="hover:shadow-sm hover:scale-105 transition-all active:scale-100 active:shadow-none"
              >
                Enable Webcam and microphone
              </Button>
            </div>
          )}
          <Link href={`/dashboard/interview/${params.id}/start`}>
            <Button className="w-64">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Interview;
