"use client";
import { useState } from "react";
import DisplayedSection from "./DisplayedSection";

export default function MyDashboard() {
  const [activeTab, setActiveTab] = useState("contributions");
  return (
    <div className="p-6 bg-white space-y-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-[#0A4D1C] text-2xl font-bold">My Dashboard</h1>
        <p className="text-[#4B5563] text-sm">
          Track your contributions and campaigns
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex relative md:flex-1">
          <button
            className={`px-4 py-2 z-10 ${
              activeTab === "contributions"
                ? "text-[#0A4D1C] border-b-2 border-[#0A4D1C]"
                : "text-black border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("contributions")}
          >
            My Contributions
          </button>
          <button
            className={`px-4 py-2 z-10 ${
              activeTab === "campaigns"
                ? "text-[#0A4D1C] border-b-2 border-[#0A4D1C]"
                : "text-black border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("campaigns")}
          >
            My Campaigns
          </button>
          <div className="absolute bottom-0 left-0 w-full h-1 border-b-1 border-[#E5E7EB]"></div>
        </div>

        <button>
          <a
            href="/supported-campaign"
            className="bg-[#0A4D1C] text-white px-4 py-2 rounded-md w-fit m-auto"
          >
            View Campaigns
          </a>
        </button>
        <button>
          <a
            href="/become-creator"
            className="bg-[#0A4D1C] text-white px-4 py-2 rounded-md w-fit m-auto"
          >
            Become a Creator
          </a>
        </button>
      </div>

      <DisplayedSection section={activeTab} />
    </div>
  );
}
