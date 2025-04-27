import ContributionHistory from "./ContributionHistory";
import { recentContributions } from "../data/contribution";

export default function MyContribution() {
  return (
    <div className="space-y-6">
      <ContributionHistory />
      <div className="w-full bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <h2 className="text-2xl font-semibold text-black p-6">
          Recent Contributions
        </h2>
        <table className="w-full text-[#4B5563] p-6 border-t border-[#E5E7EB]">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left px-6 py-4">Project Name</th>
              <th className="text-left px-6 py-4">Amount</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentContributions.map((contribution, index) => (
              <tr
                key={contribution.projectName}
                className={`border-b border-[#E5E7EB] text-black ${
                  index === recentContributions.length - 1 ? "border-none" : ""
                }`}
              >
                <td
                  className={`px-6 py-4  ${
                    index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                  }`}
                >
                  {contribution.projectName}
                </td>
                <td
                  className={`px-6 py-4  ${
                    index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                  }`}
                >
                  {contribution.amount}
                </td>
                <td
                  className={`px-6 py-4  ${
                    index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                  }`}
                >
                  {contribution.date}
                </td>
                <td
                  className={`px-6 py-4  ${
                    index % 2 === 0 ? "bg-[#F9FAFB]" : ""
                  }`}
                >
                  {contribution.status === "Processing" ? (
                    <span className="text-blue-600 px-2 py-1 rounded-full bg-blue-100">
                      {contribution.status}
                    </span>
                  ) : (
                    <span className="text-green-600 px-2 py-1 rounded-full bg-green-100">
                      {contribution.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
