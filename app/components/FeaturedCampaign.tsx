import Image from "next/image"
import { Share2 } from "lucide-react"

// Sample project data
const projects = [
  {
    id: 1,
    title: "DeFi Innovation Hub",
    description: "Building the next generation of decentrafinance protocols on StarkNet",
    image: "/blockchain.png",
    raised: "145k ETH",
    goal: "445k ETH",
    daysLeft: 12,
    progress: 72,
  },
  {
    id: 2,
    title: "GameFi Platform",
    description: "Revolutionary gaming ecosystem powered by StarkNet's scalability",
    image: "/candle.png",
    raised: "89k ETH",
    goal: "445k ETH",
    daysLeft: 18,
    progress: 60,
  },
  {
    id: 3,
    title: "NFT Marketplace",
    description: "First-ever NFT marketplace built specifically for StarkNet",
    image: "/blockchain.png",
    raised: "220k ETH",
    goal: "445k ETH",
    daysLeft: 21,
    progress: 75,
  },
]

export default function FeaturedProjects() {
  return (
    <section className="w-full px-6 md:px-9 lg:px-16 max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-8 text-[#1A5D1A] md:text-[#000000]">Featured Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className=" max-sm:border max-sm:border-gray-200 shadow-lg max-w-sm max-sm:max-w-md mx-auto rounded-xl  bg-white">
            <div className="relative h-48 max-sm:h-52 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover w-full h-full rounded-t-xl"
              />
                  <button
                className="absolute top-3 right-3 bg-white rounded-lg border border-[#1A5D1A] h-10 w-10 flex items-center justify-center"
                aria-label="Share project"
              >
                <Share2 className="h-6 w-6 text-[#1A5D1A]" />
              </button>

            </div>

            <div className="p-5">
              <h3 className="text-xl text-[#000000] font-bold mb-2">{project.title}</h3>
              <p className="text-[#000000] mb-4">{project.description}</p>

              {/* Progress bar directly in this component */}
              <div className="w-full">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className="flex flex-col items-center my-4">
                <div className="flex justify-between w-full">
                  <p className="font-medium text-md text-[#0B4D2C]">${project.raised} Raised </p>
                  <p className="text-md text-[#424359]">${project.goal} goal</p>
                </div>
              </div>
                <div className="text-[#424359] mt-2">
                  <p className="text-sm">{project.daysLeft} days left</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

