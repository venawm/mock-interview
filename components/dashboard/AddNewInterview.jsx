"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [interviewData, setInterviewData] = useState({
    position: "",
    stack: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkInterviewLimit = async () => {
      const interviewCount = await db
        .select()
        .from(MockInterview)
        .where("createdBy", user.primaryEmailAddress.emailAddress)
        .count();

      if (interviewCount >= 3) {
        toast.error("You have reached the maximum limit of 3 interviews.");
        setOpenDialog(false);
      }
    };

    if (openDialog) {
      checkInterviewLimit();
    }
  }, [openDialog, user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "experience") {
      if (!/^[0-9]*$/.test(value)) {
        toast.error("Experience must be a positive number");
        return;
      }
    }
    setInterviewData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { position, stack, experience } = interviewData;
    if (position.trim().length === 0) {
      toast.error("Job position cannot be empty");
      setLoading(false);
      return;
    }
    if (!/^[0-9]+$/.test(experience)) {
      toast.error("Experience must be a positive number");
      setLoading(false);
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(position)) {
      toast.error("Job role/position must contain only letters and spaces");
      setLoading(false);
      return;
    }
    if (!/^[a-zA-Z\s,]+$/.test(stack)) {
      toast.error("Tech stack must contain only letters, spaces, and commas");
      setLoading(false);
      return;
    }

    const inputPrompt = `Job Position:${position}, Job Description:${stack}, Years of Experience:${experience}. Depending on the Job position, Description and years of experience, give me 5 interview questions along with answers in JSON format. Give me question and answer field on JSON same like this format [{question:'',answer:''},{question:'',answer:''}] strictly`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const resultText = await result.response.text();
      const MockJsonResp = resultText.replace("```json", "").replace("```", "");

      try {
        JSON.parse(MockJsonResp);
      } catch (error) {
        toast.error("Error while parsing data, please enter correct values");
        setLoading(false);
        return;
      }

      setJsonResponse(MockJsonResp);

      const res = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: position,
          jobDesc: stack,
          jobExp: experience,
          createdBy: user.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (res) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${res[0].mockId}`);
      }
    } catch (error) {
      toast.error("Failed to generate interview questions");
    } finally {
      setLoading(false);
      setInterviewData({
        position: "",
        stack: "",
        experience: "",
      });
    }
  };

  return (
    <div>
      <div
        className="p-10 shadow-sm rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all active:shadow-sm active:scale-100"
        onClick={() => setOpenDialog(!openDialog)}
      >
        <h2 className="font-bold text-lg text-center ">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-xs md:max-w-2xl">
          <DialogHeader className="text-2xl">
            <DialogTitle>Tell us more about the interview</DialogTitle>
            <DialogDescription className="pt-4">
              <div className="flex flex-col gap-y-4 text-left">
                <h2>
                  Add details about your job position/role, job description.
                </h2>
                <div>
                  <label htmlFor="position">Job role/Job Position</label>
                  <Input
                    id="position"
                    placeholder="Ex. Frontend Developer"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="stack">Job Description</label>
                  <Textarea
                    id="stack"
                    placeholder="Ex.Develop and maintain web applications using Java and React."
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="experience">Years of Experience</label>
                  <Input
                    id="experience"
                    placeholder="Ex. 5"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </DialogDescription>
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(!openDialog)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className=" animate-spin" />
                    Generating From Ai
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
