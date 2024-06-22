import { Atom } from "lucide-react";
import React from "react";

const Card = ({ title = "", description = "", icon }) => {
  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 text-slate-800 md:w-[450px]">
      <div className="flex items-center sm:gap-8">
        <div className="flex flex-col items-center">
          {icon}
          <h3 className="mt-4 text-lg font-medium sm:text-xl">{title}</h3>

          <p className="mt-1 text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
