import { campaigns } from "../../data/campaign";
import { findCampaignBySlug } from "../../utils/slugify";
import CampaignDetailContent from "./CampaignDetailContent";
import { notFound } from "next/navigation";

interface CampaignDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { slug } = params;
  const campaign = findCampaignBySlug(campaigns, slug);

  if (!campaign) {
    notFound();
  }

  return <CampaignDetailContent campaign={campaign} />;
}
