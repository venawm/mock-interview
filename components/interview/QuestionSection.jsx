"use client";
import { Lightbulb, Volume2Icon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const QuestionSection = ({
  interviewQuestion,
  activeIndex,
  setActiveIndex,
}) => {
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
  return (
    interviewQuestion && (
      <div className="border rounded-md p-4 w-[100%] lg:w-[600px]">
        <div className="flex  justify-start gap-4 flex-wrap p-4">
          {interviewQuestion?.map((question, index) => {
            return (
              <h2
                className={`p-2  rounded-full  text-xs font-bold hover:cursor-pointer ${
                  activeIndex === index
                    ? "bg-primary text-white"
                    : "bg-secondary"
                } transition-all`}
                onClick={() => setActiveIndex(index)}
              >
                Question {index + 1}
              </h2>
            );
          })}
        </div>
        <h2 className="text-sm md:text-md px-2 mb-4">
          {interviewQuestion[activeIndex]?.question}
        </h2>
        <h2 className="px-2 mb-4">
          <Volume2Icon
            className="text-primary hover:scale-105 transition-all"
            onClick={() => {
              textToSpeech(interviewQuestion[activeIndex]?.question);
            }}
          />
        </h2>
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
      </div>
    )
  );
};

export default QuestionSection;
