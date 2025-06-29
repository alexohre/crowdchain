"use client"
import React, { useState } from "react";
import Image from "next/image";

interface FAQsCardProps {
  question: string;
  answer: string;
}

export default function FAQsCard({question, answer}: FAQsCardProps) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  return (
    <div className="flex container mx-auto px-4 mb-4 justify-center">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 w-full max-w-200">
        <button
          className="flex items-center justify-between mb-4 w-full focus:outline-none"
          onClick={toggleOpen}
          aria-expanded={open}
          aria-controls={`faq-answer-${question}`}
        >
          <h2 className="text-green-900 font-semibold text-left">{question}</h2>
          <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
            <Image
              src="/chevron-down.svg"
              alt="Chevron-down Icon"
              width={24}
              height={24}
            />
          </span>
        </button>
        {open && (
          <h2
            id={`faq-answer-${question}`}
            className="text-gray-600"
          >
            {answer}
          </h2>
        )}
      </div>
    </div>
  );
}
