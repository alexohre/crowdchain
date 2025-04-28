import { FaEthereum } from "react-icons/fa";
import { Campaign } from "../types/campaign";
import { Calendar } from "lucide-react";

export default function CampaignCard(campaign: Campaign) {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between p-4 border border-[#E5E7EB] rounded-lg h-[fit-content]">
      <div className="w-[16rem] h-[10rem]">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg text-black">{campaign.title}</h2>
          <p className="text-sm text-[#4B5563]">
            {campaign.status === "Active" ? (
              <span className="text-green-600 px-2 py-1 rounded-full bg-green-100">
                {campaign.status}
              </span>
            ) : (
              <span className="text-blue-600 px-2 py-1 rounded-full bg-blue-100">
                {campaign.status}
              </span>
            )}
          </p>
        </div>
        <div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-[#4B5563]">
            <p>Total Raised</p>
            <p className="flex items-center justify-start gap-2 text-[#0A3B07] text-lg font-bold">
              <FaEthereum /> {campaign.raised} ETH
            </p>
          </div>
          <div className="text-sm text-[#4B5563]">
            <p>Funding Goal</p>
            <p className="flex items-center justify-end gap-2 text-[#4B5563] text-sm">
              <FaEthereum /> {campaign.goal} ETH
            </p>
          </div>
        </div>
        <div className="bg-[#F3F4F6] rounded-full w-full h-2">
          <div
            className={`bg-[#0A3B07] h-full rounded-full`}
            style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
          ></div>
        </div>
        </div>
        <div className="flex items-center justify-start gap-2 text-sm text-[#4B5563]">
          <Calendar className="w-4 h-4" />{" "}
          <p className="">Ends on:{campaign.endDate}</p>
        </div>
      </div>
    </div>
  );
}
