"use client";
import React, { useState } from "react";
import { campaigns } from "../data/campaign";
import { FiClock } from "react-icons/fi";

const SupportedCampaignPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const campaignsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

  // Calculate the campaigns to display on the current page
  const startIndex = (currentPage - 1) * campaignsPerPage;
  const endIndex = startIndex + campaignsPerPage;
  const currentCampaigns = campaigns.slice(startIndex, endIndex);

  // Handle "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-gradient-to-b from-white to-green-50 pb-16">
      <section className="bg-[url('/images/bg-hero.png')] bg-cover bg-center h-56 flex items-center justify-center mb-20">
        <h1 className="text-5xl font-bold text-black">
          Track Your <span className="text-[#1A5D1A]">Supported</span>,
          Campaigns
        </h1>
      </section>
      <section className="px-12">
        <section className="mb-8">
          <h1 className="text-2xl text-[#111827]">Supported Campaigns</h1>
          <p className="text-[#4B5563] text-sm mt-2">
            Track your contributions and campaign progress
          </p>
        </section>

        <section className="grid grid-cols-2 gap-6">
          {currentCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-md p-5 text-left"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="flex justify-between items-center mt-4">
                <h3 className="font-medium text-[#111827]">{campaign.title}</h3>
                <span
                  className={`text-sm px-3 py-1 rounded-full mt-2 inline-block ${
                    campaign.status === "Active"
                      ? "bg-[#DCFCE7] text-[#166534]"
                      : "bg-[#F3F4F6] text-[#1F2937]"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-4">
                <span className="text-[#111827] font-medium">
                  {campaign.raised} ETH
                </span>
                <span className="text-[#4B5563]">
                  Funding Goal: {campaign.goal} ETH
                </span>
              </div>
              <div className="w-full bg-[#F3F4F6] rounded-full h-2 mt-2">
                <div
                  className="bg-[#1B5E20] h-full rounded-full"
                  style={{
                    width: `${(campaign.raised / campaign.goal) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center gap-2 mt-4 text-[#4B5563]">
                <FiClock />
                <p className="text-sm">Ends on: {campaign.endDate}</p>
              </div>
            </div>
          ))}
        </section>
      </section>

      <div className="flex justify-center gap-3 mt-10">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-green-50 text-[#4B5563] border-[1px] border-gray-200 rounded-lg ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={`px-3 py-2 border-[1px] rounded-lg ${
              currentPage === index + 1
                ? "bg-[#1B5E20] border-transparent text-white"
                : "bg-green-50 border-gray-200 text-[#4B5563]"
            }`}
          >
            {index + 1}
          </span>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-green-50 text-[#4B5563] border-[1px] border-gray-200 rounded-lg ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default SupportedCampaignPage;
