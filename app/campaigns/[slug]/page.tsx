import { campaigns } from "../../data/campaign";
import { findCampaignBySlug } from "../../utils/slugify";
import CampaignDetailContent from "./CampaignDetailContent";
import { notFound } from "next/navigation";

interface CampaignDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { slug } = await params;
  const campaign = findCampaignBySlug(campaigns, slug);

  if (!campaign) {
    notFound();
  }

  return <CampaignDetailContent campaign={campaign} />;
}
