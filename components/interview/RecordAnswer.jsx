"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const RecordAnswer = ({}) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <div className="flex flex-col justify-center lg:items-start gap-2">
      <div
        className={` flex flex-col justify-center items-center  relative  ${
          webCamEnabled ? "" : "rounded-md p-44 bg-slate-800"
        }`}
      >
        <Image
          src="/assets/web-cam.png"
          height={300}
          width={300}
          alt="Webcam"
          className="absolute animate-wiggle"
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
    </div>
  );
};

export default RecordAnswer;
