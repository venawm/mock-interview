"use client";

import { Lightbulb, LoaderCircle, User, Volume2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { Button } from "../ui/button";
import { Mic } from "lucide-react";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { eq } from "drizzle-orm";

const QuestionSection = ({
  interviewQuestion,
  activeIndex,
  setActiveIndex,
  setUserAnswer,
  interviewData,
  userAnswer,
  mockId,
}) => {
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    checkAnswer();
  }, [interviewQuestion, activeIndex]);
  const fetchData = async () => {
    const res = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, mockId));
    if (!res) {
      toast.error("Error fetching data please contact the administrator");
    }
    setQuestions(res);
  };

  const checkAnswer = async () => {
    questions?.map((e) => {
      if (interviewQuestion) {
        if (e.question.includes(interviewQuestion[activeIndex]?.question)) {
          setAnswered(true);
        } else {
          setAnswered(false);
        }
      }
    });
  };
  const { user } = useUser();
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      toast.error(
        "Sorry it seems your browser doesnt support text to speech  "
      );
    }
  };
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateUserAnswer = async () => {
    if (userAnswer?.length < 10) {
      toast.error("Please provide an answer with a minimum of ten words.");
      console.log(userAnswer);
      setLoading(false);

      return;
    }
    setLoading(true);
    console.log(userAnswer);
    const feedbackPrompt = `Question: ${interviewQuestion[activeIndex]?.question}, User Answer: ${userAnswer}. Based on the question and user answer, please provide a rating 1-10 and feedback, including areas for improvement, in 3 to 5 lines. Format the response in JSON with "rating" and "feedback" fields.`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const resp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const feedbackResponse = JSON.parse(resp);
    setLoading(false);

    const res = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: interviewQuestion[activeIndex]?.question,
      correctAnswer: interviewQuestion[activeIndex]?.answer,
      UserAnswer: userAnswer,
      feedback: feedbackResponse.feedback,
      rating: feedbackResponse.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });
    if (res) {
      toast.success("User answer recorded sucessfully");
    }
    setLoading(false);
    setUserAnswer("");
  };
  return (
    interviewQuestion && (
      <div className=" flex flex-col rounded-md p-4 w-[100%] lg:w-[600px] gap-2 border">
        <div className="flex  justify-start gap-4 flex-wrap p-4">
          {interviewQuestion?.map((question, index) => {
            return (
              <h2
                key={index}
                className={`p-2  rounded-full  text-xs font-bold hover:cursor-pointer ${
                  activeIndex === index
                    ? "bg-primary text-white"
                    : "bg-secondary"
                } transition-all`}
                onClick={() => {
                  setActiveIndex(index);
                  checkAnswer();
                }}
              >
                Question {index + 1}
              </h2>
            );
          })}
        </div>
        <h2 className="text-sm md:text-md px-2">
          {interviewQuestion[activeIndex]?.question}
        </h2>
        <h2 className="px-2">
          <Volume2Icon
            className="text-primary hover:scale-105 transition-all"
            onClick={() => {
              textToSpeech(interviewQuestion[activeIndex]?.question);
            }}
          />
        </h2>
        {answered ? (
          <></>
        ) : (
          <>
            <Textarea
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
              }}
              className="min-h-[200px]"
            />
          </>
        )}

        <div className="bg-green-100 p-2 rounded-md text-primary">
          <h2 className="flex items-center gap-2">
            <Lightbulb />
            <strong>Note</strong>
          </h2>

          <h2 className="text-sm max-w-full text-justify p-2">
            Please click "Record Answer" when you are prepared to respond to the
            question. At the conclusion of the interview, we will offer feedback
            on each of your responses and provide the correct answers to all the
            questions.f rhe questinons
          </h2>
        </div>
        <Button
          className="text-md"
          onClick={() => updateUserAnswer()}
          disabled={loading || answered}
        >
          {loading ? (
            <>
              <LoaderCircle className=" animate-spin" /> Loading
            </>
          ) : (
            <>{answered ? "Submitted" : "Submit Answer"}</>
          )}
        </Button>
      </div>
    )
  );
};

export default QuestionSection;
