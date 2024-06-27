import React from "react";
import { MailIcon, HomeIcon, PhoneCall } from "lucide-react";
import Form from "@/components/From";
import Header from "@/components/navigation/Header";

const Contact = () => {
  return (
    <section>
      <Header />
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[480px] mb-6 xl:mb-24">
          {/* {Text} */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-x-4 text-primary text-lg mb-4">
              <span className="w-[30px] h-[2px] bg-primary"></span>
              Contact Page
            </div>
            <h1 className="h1 max-w-md mb-8  text-6xl xl:text-[72px] xl:leading-[88px] tracking-[-2px] font-extrabold">
              Contact us for any queries
            </h1>
          </div>
          {/* illusirations */}
          <div className="hidden xl:flex w-full bg-contact bg-contain bg-top bg-no-repeat"></div>
        </div>
        <div>
          {/* info */}
          <div className="grid xl:grid-cols-2 mb-24 xl:mb-32">
            <div className="flex flex-col gap-y-4 xl:gap-y-14 mb-12 text-base xl:text-lg">
              <div className="flex items-center gap-x-8 text-primary">
                <MailIcon size={18} />
                <div>pandesamir3@gmail.com</div>
              </div>
              <div className="flex items-center gap-x-8 text-primary">
                <HomeIcon size={18} />
                <div>Kalimati,Kathmandu</div>
              </div>
              <div className="flex items-center gap-x-8 text-primary">
                <PhoneCall size={18} />
                <div>+977 9865366391</div>
              </div>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
