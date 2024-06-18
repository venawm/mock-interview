"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

const RecordAnswer = () => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prev) => prev + result.transcript);
    });
  }, [results]);
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="flex flex-col justify-center lg:items-start gap-2">
      <div
        className={` flex flex-col justify-center items-center rounded-md relative  ${
          webCamEnabled ? "p-4 bg-black" : "p-36 bg-slate-800"
        }`}
      >
        <Image
          src="/assets/web-cam.png"
          height={200}
          width={200}
          alt="Webcam"
          className="absolute"
        />
        <Webcam
          className="z-10 rounded-md"
          onUserMedia={() => {
            setWebCamEnabled(true);
          }}
          onUserMediaError={() => [setWebCamEnabled(false)]}
          style={{
            borderRadius: 20,
          }}
        />
      </div>
      <Button
        variant="outline"
        className={`border-2  text-primary font-bold hover:text-green-600 w-1/2 ${
          isRecording ? "border-red-600" : "border-primary"
        }`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="flex justify-center items-center gap-2 text-red-600 animate-in">
            <Mic className=" animate-wiggle" />
            Recording
          </h2>
        ) : (
          <h2>Record answer</h2>
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>show</Button>
    </div>
  );
};

export default RecordAnswer;
