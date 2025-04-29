"use client";
import React, { useState } from "react";
import CampaignCard from "../components/CampaignCard";
import campaigns from "../data";
import Link from "next/link";


const itemsPerPage = 9;

const Page = () => {
  const [activeTab, setActiveTab] = useState<"active" | "passed">("active");
  const [currentPage, setCurrentPage] = useState(1);

  
  const filteredCampaigns = campaigns.filter((campaign) =>
    activeTab === "active"
      ? campaign.status === "active"
      : campaign.status === "passed"
  );

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  
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
          
          
          <div className="flex items-center space-x-4 border-b pb-2 cursor-pointer">
            <button
              className={`px-4 py-2 text-black ${
                activeTab === "active" ? "border-b-2 border-green-600 font-bold" : ""
              }`}
              onClick={() => {
                setActiveTab("active");
                setCurrentPage(1); 
              }}
            >
              Active Campaigns
            </button>
            <button
              className={`px-4 py-2 text-black ${
                activeTab === "passed" ? "border-b-2 border-green-600 font-bold" : ""
              }`}
              onClick={() => {
                setActiveTab("passed");
                setCurrentPage(1); 
              }}
            >
              Past Campaigns
            </button>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
            {currentCampaigns.length > 0 ? (
              currentCampaigns.map((campaign) => (
                <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
                  <CampaignCard {...campaign} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No campaigns available.</p>
            )}
          </div>

        
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 border  border-green-600 rounded text-black ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {"<"}
              </button>

              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 border border-green-600 rounded text-black ${
                    currentPage === i + 1 ? "bg-green-700 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

            
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border  border-green-600  text-black rounded ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {">"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
