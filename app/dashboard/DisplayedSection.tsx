import MyCampaigns from "./MyCampaigns";
import MyContribution from "./MyContribution";

interface DisplayedSectionProps {
  section: string;
}

export default function DisplayedSection({ section }: DisplayedSectionProps) {
  const topStats = [
    { label: "Total Contributed", value: "156 ETH", change: "+12.5%" },
    { label: "Active Campaigns", value: "8", change: null },
    { label: "Supported Campaigns", value: "23", change: null },
  ];
  const selectedSection =
    section === "contributions" ? <MyContribution /> : <MyCampaigns />;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 justify-between mb-6">
        {topStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-2 rounded-lg p-6 w-full border border-[#E5E7EB]"
          >
            <p className="text-sm text-[#4B5563]">{stat.label}</p>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        ))}
      </div>
      <button>
        <a
          href="/supported-campaign"
          className="bg-[#0A4D1C] text-white px-4 py-2 rounded-md w-fit m-auto"
        >
          View Campaigns
        </a>
      </button>
      {selectedSection}
    </>
  );
}
