import { campaigns } from "../data/campaign";
import CampaignCard from "./CampaignCard";
import { calculateDaysLeft } from "../utils/slugify";

export default function FeaturedProjects() {
  const featuredCampaigns = campaigns.slice(0, 3);
  return (
    <section className="w-full px-6 md:px-9 lg:px-16 max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8 text-[#1A5D1A] md:text-[#000000]">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.title}
            description={campaign.description || "No description available"}
            image={campaign.image}
            raisedAmount={campaign.raised.toString()}
            daysLeft={campaign.endDate ? calculateDaysLeft(campaign.endDate) : 0}
            progress={Math.round((campaign.raised / campaign.goal) * 100)}
            status={campaign.status}
            slug={campaign.slug}
          />
        ))}
      </div>
    </section>
  );
}
