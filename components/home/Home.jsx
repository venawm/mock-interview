"use client";

import React, { useRef } from "react";
import Header from "../navigation/Header";
import { Button } from "../ui/button";
import {
  ArrowRight,
  BrainCircuit,
  CircleDollarSign,
  ClipboardCheck,
} from "lucide-react"; // Import lucide-react icons

import Link from "next/link";
import Image from "next/image";
import Card from "../ui/card";
import { Atom } from "lucide-react"; // Import the icon you want to use

const data = [
  {
    title: "Create custom interview questions",
    description:
      "Tailor your interview experience with personalized questions designed to showcase your skills and experience effectively.",
    icon: <Atom size={48} />,
  },
  {
    title: "AI-generated questions and feedback",
    description:
      "Harness the power of AI to generate tailored interview questions that assess your skills and potential. Receive personalized feedback based on your responses to refine your interview technique.",
    icon: <BrainCircuit size={48} />,
  },
  {
    title: "Enhanced interview preparation with AI insights",
    description:
      "Optimize your interview readiness with AI-driven insights. Access tailored questions and expert feedback to refine your responses and boost your confidence.",
    icon: <ClipboardCheck size={48} />,
  },
];

const HomePage = () => {
  const howItWorksRef = useRef(null);
  const scrollToHowItWorks = () => {
    howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-center">
      <Header scrollTo={scrollToHowItWorks} />

      <div className="p-6 px-6 md:px-24 lg:px-4 bg-img bg-no-repeat bg-cover h-[100vh] flex flex-col pt-28 items-center gap-12">
        <h2 className="text-center text-3xl md:text-[4rem] font-bold text-slate-800 leading-none">
          Your Personal AI Interview Coach
        </h2>
        <p className="text-md md:text-xl text-gray-600">
          Double your chances of landing that job offer with our AI-powered
          interview prep
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <Link href="/dashboard">
            {" "}
            <Button className="py-7 px-10 flex gap-2 border-2 border-primary">
              Get Started <ArrowRight />
            </Button>
          </Link>

          <Link href="/upgrade">
            <Button
              variant="secondary"
              className="py-7 px-8 flex gap-2 bg-white border-2 border-primary text-primary font-bold"
            >
              <CircleDollarSign /> Check Pricing
            </Button>
          </Link>
        </div>
        <div>
          <p className="font-bold text-xl text-slate-400 mt-12">POWERED BY</p>
          <div className="flex items-center justify-evenly gap-16">
            <Image
              src="/logos/gemini.png"
              className="grayscale-0 md:grayscale hover:grayscale-0 transition-all"
              height={200}
              width={200}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-20">
          <h2 className="text-4xl font-semibold text-slate-800">
            How it Works
          </h2>
          <p className="text-slate-500">
            Give mock interview in just 3 simple easy step
          </p>
          <div
            ref={howItWorksRef}
            className=" flex flex-col md:flex-row justify-center gap-8 flex-wrap"
          >
            {data.map((item, index) => {
              return (
                <Card
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
