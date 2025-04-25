import {
  BarChart3,
  Rocket,
  Package,
  Settings,
  Users,
  Lightbulb,
  Mail,
} from "lucide-react";

export default function ExploreCategories() {
  const categories = [
    {
      name: "DeFi",
      icon: <img src="Defi.svg" alt="DeFi" className="h-6 w-6" />,
    },
    {
      name: "GameFi",
      icon: <img src="GameFi.svg" alt="GameFi" className="h-6 w-6" />,
    },
    {
      name: "NFTs",
      icon: <img src="NFT.svg" alt="NFTs" className="h-6 w-6" />,
    },
    {
      name: "Infrastructure",
      icon: (
        <img
          src="infrastructure.svg"
          alt="Infrastructure"
          className="h-6 w-6"
        />
      ),
    },
    {
      name: "Social",
      icon: <img src="social.svg" alt="Social" className="h-6 w-6" />,
    },
    {
      name: "Innovation",
      icon: <img src="innovation.svg" alt="Innovation" className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16 mb-12">
      {/* Explore Categories Section */}
      <section>
        <h2 className="text-[#000000] text-2xl font-bold mb-8">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer border rounded-lg bg-white"
            >
              {category.icon}
              <span className="font-medium text-[#000000]">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Stay Connected Section */}
      <section className="bg-[#FFFFFF] p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-[#1A5D1A] text-2xl font-bold">Stay Connected</h2>
          <p className="text-slate-600">
            Get the latest updates on new projects and StarkNet ecosystem news
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-[#1A5D1A] hover:bg-[#1A5D1A] text-white px-4 py-2 rounded-md inline-flex items-center transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
