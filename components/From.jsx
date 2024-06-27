"use client";

import React, { useState } from "react";
import DrawOutlineButton from "./ui/AnimatedButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MailIcon, ArrowRightIcon, MessageSquare } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState("Send");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      toast.error("Invalid name. Please use only letters and spaces.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address.");
      return;
    }

    if (formData.message.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }

    // If all validations pass
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "Message sent successfully! I will reply to you as soon as possible."
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setLoading("Send");
      } else {
        toast.error("Failed to send message.");
        setLoading("Send");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setLoading("Send");
    }
  };

  return (
    <>
      <Toaster />
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <User className="absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center">
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <MailIcon className="absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center">
          <Textarea
            id="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          <MessageSquare className="absolute top-4 right-6" size={20} />
        </div>
        <Button
          className="flex items-center max-w-[166px] gap-x-2"
          type="submit"
        >
          {loading} <ArrowRightIcon size={20} />
        </Button>
      </form>
    </>
  );
};

export default Form;
