import { campaigns } from "../data/campaign";
import CampaignCard from "./CampaignCard";

export default function MyCampaigns() {
  return (
    <div className="flex flex-col gap-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} {...campaign} />
      ))}
    </div>
  );
}

