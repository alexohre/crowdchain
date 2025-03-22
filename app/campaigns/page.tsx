"use client";
import React, { useState } from "react";
import CampaignCard from "../components/CampaignCard";
import campaigns from "../data";
import Link from "next/link";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"active" | "passed">("active");

  
  const filteredCampaigns = campaigns.filter((campaign) =>
    activeTab === "active"
      ? campaign.status === "active"
      : campaign.status === "passed"
  );

  return (
    <section>
      <div className="bg-gradient-to-b from-white to-[#C3E3C3] flex items-center justify-center h-[150px] sm:h-[375px]">
        <h1 className="text-center text-2xl text-[#000000] md:text-4xl lg:text-6xl font-bold leading-tight">
          Join the <span className="text-[#1A5D1A]">movement</span> and be part
          <span className="block">
            of something <span className="text-[#1A5D1A]">amazing!</span>
          </span>
        </h1>
      </div>

      <div className="min-h-screen bg-gray-50 p-6 mt-5">
        <div className="max-w-7xl flex flex-col justify-center items-center mx-auto">
          {/* Tabs */}
          <div className="flex items-center space-x-4 border-b pb-2">
            <button
              className={`px-4 py-2 text-black ${
                activeTab === "active"
                  ? "border-b-2 border-green-600 font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active Campaigns
            </button>
            <button
              className={`px-4 py-2 text-black  ${
                activeTab === "passed"
                  ? "border-b-2 border-green-600 font-bold"
                  : ""
              }`}
              onClick={() => setActiveTab("passed")}
            >
              Passed Campaigns
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign, index) => (
                <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
                  <CampaignCard {...campaign} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No campaigns available.</p>
            )}
          </div>

          
          <div className="flex justify-center space-x-2 mt-6">
            <button className="px-3 py-1 border rounded">{"<"}</button>
            <button className="px-3 py-1 bg-green-700 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <button className="px-3 py-1 border rounded">{">"}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
