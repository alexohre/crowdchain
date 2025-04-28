import Image from "next/image";
import React, { Children } from "react";

export interface TopCampaignCardProps {
  rank: number;
  name: string;
  raised: number;
  currency: string;
  status: string;
  goal: number;
  endDate: string;
  picture: string;
}
export interface TopContributorsCardProps {
  rank: number;
  address: string;
  supportedCampaigns: number;
  totalContributed: number;
  currency: string;
  picture: string;
}
export const TopCampaignCard: React.FC<TopCampaignCardProps> = ({
  name,
  raised,
  currency,
  status,
  goal,
  endDate,
  picture,
  rank
}) => {
  const progressPercentage = Math.min((raised / goal) * 100, 100);

  return (
    <div className="w-full max-w-[750px] lg:max-w-[900px] mx-auto flex flex-row bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-[#E8F5E9] text-[#1B5E20] text-lg md:text-2xl font-bold basis-[15%] flex items-center justify-center">
        #{rank}
      </div>
      <div className="p-2 md:p-6 grow flex flex-row gap-4">
        <Image
          src={picture}
          alt={name}
          width={180}
          height={96}
          className=" rounded-2xl overflow-hidden object-cover"
        />
        <div className="grow">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
            {name}
          </h2>
          <div className="flex justify-between items-center mb-1 text-sm md:text-base">
            <span className="text-gray-600">
              Raised: {raised.toFixed(1)} {currency}
            </span>
            <span className="text-gray-600">
              Goal: {goal.toFixed(1)} {currency}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm md:text-base font-medium ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
            <span className="text-gray-600 text-sm md:text-base">
              Ends: {endDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TopContributorsContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Contributor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Supported Campaigns
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Total Contributed
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};
export const TopContributorsCard: React.FC<TopContributorsCardProps> = ({
  rank,
  address,
  supportedCampaigns,
  totalContributed,
  currency,
  picture,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
        {rank == 1 ? (
          <img
            src={"/gold-rank.svg"}
            alt="Gold (First)"
            className="w-10 h-10"
          />
        ) : rank == 2 ? (
          <img
            src={"/silver-rank.svg"}
            alt="Silver (Second)"
            className="w-10 h-10"
          />
        ) : rank == 3 ? (
          <img
            src={"/bronze-rank.svg"}
            alt="Bronze (Third)"
            className="w-10 h-10"
          />
        ) : (
          `#${rank}`
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={picture}
            alt={address}
            className="rounded-full"
            width={40}
            height={40}
          />
          <span className="ml-4">{address.slice(0, 10) + "..." + address.slice(30)}</span>
          <img
            src={"/letter-i-icon.svg"}
            alt="Information"
            className="w-[20px] h-[20px] cursor-pointer"
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {supportedCampaigns} campaigns
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2E7D32]">
        {totalContributed} {currency}
      </td>
    </tr>
  );
};
