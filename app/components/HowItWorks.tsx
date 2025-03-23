import type React from "react"
import { Box, Wallet, ChartLine, Rocket, Layers, ChartColumnBig } from "lucide-react"

interface StepProps {
  icon: React.ReactNode
  title: string
  description: string
}

const DesktopStep = ({ icon, title, description }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A5D1A] text-white mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#1A5D1A]">{title}</h3>
      <p className="text-[#4B5563] max-w-md">{description}</p>
    </div>
  )
}

const MobileStep = ({ icon, title, description }: StepProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A5D1A] text-white">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#1A5D1A] mb-1">{title}</h3>
        <p className="text-[#4B5563] text-sm">{description}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const steps = [
    {
      icon: <Box className="h-6 w-6" />,
      title: "Create Project",
      description: "Set up your project campaign, define your goals, and share your vision",
      desktopDescription: "Set up your project with details, funding goals, and rewards",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Get Funded",
      description: "Receive contributions from supporters worldwide in cryptocurrency",
      desktopDescription: "Receive contributions from supporters worldwide",
    },
    {
      icon: <ChartLine className="h-6 w-6" />,
      title: "Track Progress",
      description: "Monitor your funding progress and engage with your supporters",
      desktopDescription: "Monitor your funding progress and engage with backers",
    },
  ]

  return (
    <section className="py-16 px-4 max-sm:bg-[#F9FAFB]">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A5D1A] mb-8 md:mb-16">How It Works</h2>

      {/* Mobile Layout */}
      <div className="md:hidden max-w-md mx-auto space-y-8">
        {steps.map((step, index) => (
          <MobileStep key={index} icon={step.icon} title={step.title} description={step.description} />
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid max-w-6xl mx-auto grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <DesktopStep
            key={index}
            icon={
              index === 0 ? (
                <Rocket className="h-8 w-8" />
              ) : index === 1 ? (
                <Layers className="h-8 w-8" />
              ) : (
                <ChartColumnBig className="h-8 w-8" />
              )
            }
            title={step.title}
            description={step.desktopDescription}
          />
        ))}
      </div>
    </section>
  )
}

