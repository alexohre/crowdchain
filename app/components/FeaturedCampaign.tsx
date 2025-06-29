import { campaigns } from "../data/campaign";
import CampaignCard from "./CampaignCard";
import { calculateDaysLeft } from "../utils/slugify";
import Link from "next/link";

export default function FeaturedProjects() {
  const featuredCampaigns = campaigns.slice(0, 3);
  return (
    <section className="max-w-7xl flex flex-col justify-center items-center mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-[#1A5D1A] md:text-[#000000]">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
        {featuredCampaigns.map((campaign) => (
          <Link href={`/campaigns/${campaign.slug}`} key={campaign.id}>
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              description={campaign.description || "No description available"}
              image={campaign.image}
              raisedAmount={campaign.raised.toString()}
              daysLeft={
                campaign.endDate ? calculateDaysLeft(campaign.endDate) : 0
              }
              progress={Math.round((campaign.raised / campaign.goal) * 100)}
              status={campaign.status}
              slug={campaign.slug}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
