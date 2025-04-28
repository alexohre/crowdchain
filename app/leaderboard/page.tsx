"use client";
import React, { useState } from "react";
import CampaignCard from "../components/CampaignCard";
import campaigns from "../data";
import Link from "next/link";
import { TOP_CONTRIBUTORS, TOP_CAMPAIGNS } from "../leaderboard-data";
import {
  TopCampaignCard,
  TopCampaignCardProps,
  TopContributorsCard,
  TopContributorsCardProps,
  TopContributorsContainer
} from "../components/LeaderboardCards";
import { PiCaretRightBold,PiCaretLeftBold } from "react-icons/pi";

const itemsPerPage = 9;

const TABS = [
  {
    name: "👥 Top Contributors",
    id: "top-contributors",
  },
  {
    name: "🏆 Top Campaigns",
    id: "top-campaigns",
  },
];
const Page = () => {
  const [activeTab, setActiveTab] = useState<
    "top-contributors" | "top-campaigns"
  >("top-campaigns");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCampaigns =
    activeTab === "top-contributors" ? TOP_CONTRIBUTORS : TOP_CAMPAIGNS;

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <div className="bg-gradient-to-b from-white to-[#C3E3C3] flex items-center justify-center h-[150px] sm:h-[300px]">
        <div className="flex flex-col items-center justify-center h-full w-full px-4 sm:px-8 lg:px-16">
          <h1 className="text-center text-2xl text-[#000000] md:text-4xl lg:text-6xl font-bold leading-tight">
            Celebrate <span className="text-[#1A5D1A]">Top</span> Contributors
          </h1>
          <span className="text-center text-base md:text-2xl text-black w-full max-w-[500px] mt-2 md:mt-4">
            Explore who's making a difference in the CrowdChain community{" "}
          </span>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-6 mt-5">
        <div className="max-w-7xl flex flex-col justify-center items-center mx-auto">
          <div className="flex items-center space-x-4 border-b pb-2 cursor-pointer">
            <button
              className={`px-4 py-2 text-black cursor-pointer text-sm md:text-base ${
                activeTab === "top-campaigns"
                  ? "border-b-2 border-green-600 font-bold"
                  : ""
              }`}
              onClick={() => {
                setActiveTab("top-campaigns");
                setCurrentPage(1);
              }}
            >
              🏆 Top Campaigns
            </button>
            <button
              className={`px-4 py-2 text-black cursor-pointer text-sm md:text-base ${
                activeTab === "top-contributors"
                  ? "border-b-2 border-green-600 font-bold"
                  : ""
              }`}
              onClick={() => {
                setActiveTab("top-contributors");
                setCurrentPage(1);
              }}
            >
              👥 Top Contributors{" "}
            </button>
          </div>
          {!currentCampaigns.length ? (
            <p className="text-gray-500">No campaigns available.</p>
          ) : null}

          <div className="flex flex-col gap-10 mt-6 w-full">
            {/* top campaigns */}
            {activeTab === "top-campaigns" &&
              (currentCampaigns as TopCampaignCardProps[]).map(
                (campaign, index) => (
                  <TopCampaignCard
                    key={index + campaign.name}
                    {...campaign}
                  />
                )
              )}
            {/* top contributors  */}
            {activeTab === "top-contributors" && (
              <TopContributorsContainer>
                    {(currentCampaigns as TopContributorsCardProps[]).map(
                      (contributor, index) => (
                        <TopContributorsCard key={index} {...contributor} />
                      )
                    )}
                    </TopContributorsContainer>
                  
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-2 py-1 border border-slate-300  text-black rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
               <PiCaretLeftBold size={15}/>

              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 border border-slate-300  text-black rounded  ${
                    currentPage === i + 1 ? "bg-green-700 text-white" : "cursor-pointer"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 border border-slate-300  text-black rounded   ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <PiCaretRightBold  size={15}/>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
