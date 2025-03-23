import React from "react";
import Image from "next/image";

interface FAQsCardProps {
  question: string;
  answer: string;
}

export default function FAQsCard({question, answer}: FAQsCardProps) {
  return (
    <div className="flex container mx-auto px-4 mb-4 justify-center">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 w-full max-w-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-green-900 font-semibold">{question}</h2>
          <div className="cursor-pointer fill-blue-500 stroke-blue-500 pr-1">
            <Image
              src="/chevron-down.svg"
              alt="Chevron-down Icon"
              width={24}
              height={24}
            />
          </div>
        </div>
        <h2 className="text-gray-600">
         {answer}
        </h2>
      </div>
    </div>
  );
}
