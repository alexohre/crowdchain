"use client";
import React, { useState } from "react";
import { recentContributions } from "@/app/data/contribution";

export default function ContributionsSection() {
  const [activeSubTab, setActiveSubTab] = useState<"all" | "top">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedContributions = activeSubTab === "top" 
    ? [...recentContributions].sort((a, b) => b.amount - a.amount)
    : recentContributions;

  const totalPages = Math.ceil(sortedContributions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContributions = sortedContributions.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

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

  return (
    <div className="mt-6">
      <div className="flex border-b">
        <button onClick={() => { 
            setActiveSubTab("all");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 text-sm ${
            activeSubTab === "all"
              ? "border-b-2 border-[#1A5D1A] text-[#1A5D1A] font-semibold"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          All Contributions
        </button>
        <button
          onClick={() => {
            setActiveSubTab("top");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 text-sm ${
            activeSubTab === "top"
              ? "border-b-2 border-[#1A5D1A] text-[#1A5D1A] font-semibold"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Top Contributions
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contribution Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Contribution
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Campaigns
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Contribuition
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentContributions.map((contribution) => (
              <tr key={contribution.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contribution.address.slice(0, 10)}...{contribution.address.slice(-8)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {contribution.amount} {contribution.currency}
                  </div>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {contribution.numberOfCampaigns}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(contribution.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contribution.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              currentPage === 1 
                ? "opacity-50 cursor-not-allowed bg-gray-100" 
                : "hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === i + 1
                  ? "bg-[#1A5D1A] text-white border-[#1A5D1A]"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              currentPage === totalPages 
                ? "opacity-50 cursor-not-allowed bg-gray-100" 
                : "hover:bg-gray-50 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}      
      
      {currentContributions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No contributions found for this campaign.
        </div>
      )}
    </div>
  );
}
