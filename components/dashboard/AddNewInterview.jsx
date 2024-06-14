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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [interviewData, setInterviewData] = useState({
    position: "",
    stack: "",
    experience: "",
  });

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

  const handleSubmit = () => {
    const { position, stack, experience } = interviewData;

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

    // Reset the interview data
    setInterviewData({
      position: "",
      stack: "",
      experience: "",
    });
    setOpenDialog(false); // Close the dialog after submitting
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
                  <label htmlFor="stack">Tech Stack</label>
                  <Textarea
                    id="stack"
                    placeholder="Ex. React, Angular, Java, Kotlin etc."
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
              <Button onClick={handleSubmit}>Start</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;