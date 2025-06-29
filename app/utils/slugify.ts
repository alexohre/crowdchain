// persistent in-memory cache to ensure consistent slugs for the same title
const slugSuffixCache = new Map<string, string>();

// make the title URL friendly
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// generate unique campaign slug suffix
export function generateRandomSuffix(): string {
  return Math.random().toString(36).substring(2, 8);
}

export function generateCampaignSlug(title: string): string {
  const baseSlug = slugifyTitle(title);

  if (slugSuffixCache.has(title)) {
    const cachedSuffix = slugSuffixCache.get(title)!;
    return `${baseSlug}-${cachedSuffix}`;
  }

  const suffix = generateRandomSuffix();
  slugSuffixCache.set(title, suffix);
  return `${baseSlug}-${suffix}`;
}

export function findCampaignBySlug(campaigns: any[], slug: string) {
  let campaign = campaigns.find((c) => c.slug === slug);

  if (!campaign) {
    const id = parseInt(slug);
    if (!isNaN(id)) {
      campaign = campaigns.find((c) => c.id === id);
    }
  }

  if (!campaign) {
    const titlePart = slug.split("-").slice(0, -1).join("-");
    if (titlePart.length > 0) {
      campaign = campaigns.find((c) => c.slug.includes(titlePart));
    }
  }

  return campaign;
}

export function calculateDaysLeft(endDate: string): number {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = Math.ceil(end.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
