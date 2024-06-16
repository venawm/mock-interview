"use client";
import React, { useState } from "react";
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
      return;
    }
    if (!/^[0-9]+$/.test(experience)) {
      toast.error("Experience must be a positive number");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(position)) {
      toast.error("Job role/position must contain only letters and spaces");
      return;
    }
    if (!/^[a-zA-Z\s,]+$/.test(stack)) {
      toast.error("Tech stack must contain only letters, spaces, and commas");
      return;
    }

    const inputPrompt = `Job Position:${position}, Job Description:${stack},Years of Expericence:${experience}. Depending on the Job position, Description and years of experiecne give me 5 interview questions along with answer in JSON format. Give me question and answer field on JSON`;

    const result = await chatSession.sendMessage(inputPrompt);
    console.log(result.response.text());
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResp));
    // Reset the interview data

    setJsonResponse(MockJsonResp);

    if (!MockJsonResp) {
      toast.error("Error while parsing data please enter correct values");
      return;
    }
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

    console.log("Inserted Id", res);
    if (res) {
      setOpenDialog(false);
      router.push(`/dashboard/interview/${res[0].mockId}`);
    }

    setLoading(false);
    setInterviewData({
      position: "",
      stack: "",
      experience: "",
    });
    // setOpenDialog(false); // Close the dialog after submitting
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
