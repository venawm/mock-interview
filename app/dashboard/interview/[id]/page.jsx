"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, param } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
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
    <div>
      <div>he</div>
    </div>
  );
};

export default Interview;
