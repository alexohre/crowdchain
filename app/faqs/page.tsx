import React from "react";
import FAQsCard from "../components/FAQsCard";

function page() {
  // Dummy data for FAQs
  const faqs = [
    {
      question: "What is CrowdChain?",
      answer:
        "CrowdChain is a decentralized platform that provides accessible education through blockchain technology. We connect students directly with educators worldwide, creating a decentralized learning platform that makes quality education accessible to everyone.",
    },
    {
      question: "How do I start a campaign?",
      answer:
        "Starting a campaign is simple. Click on the 'New Campaign' button in the navigation menu, fill out the required information about your educational project, set your funding goal and timeline, and submit for review. Our team will review your campaign within 24-48 hours.",
    },
    {
      question: "How does the funding process work?",
      answer:
        "The funding process uses blockchain technology to ensure transparency and security. Contributors can support campaigns using various cryptocurrencies. Funds are held in smart contracts until the campaign reaches its goal. If successful, funds are released to the campaign creator; if not, they are returned to contributors.",
    },
    {
      question: "What are the platform fees?",
      answer:
        "Our platform charges a small 5% fee on successfully funded campaigns to maintain and improve our services. This fee helps us provide better support, develop new features, and ensure platform security. There are no fees for campaigns that don't reach their funding goal.",
    },
    {
      question: "How is my contribution secured?",
      answer:
        "All contributions are secured through blockchain technology and smart contracts. We use industry-standard security protocols and regular audits to ensure the safety of all transactions. Your funds are held in secure smart contracts until the campaign reaches its goal.",
    },
    {
      question: "Can I cancel my campaign?",
      answer:
        "Yes, you can cancel your campaign before it reaches its end date if no contributions have been made. Once contributions start coming in, cancellation requires approval from our support team to protect contributors' interests.",
    },
    {
      question: "How do I withdraw funds?",
      answer:
        "Once your campaign successfully reaches its goal, you can withdraw funds through your dashboard. The withdrawal process is automated through smart contracts, and funds will be transferred to your connected wallet within 24-48 hours.",
    },
    {
      question: "What happens if my campaign doesn't reach its goal?",
      answer:
        "If a campaign doesn't reach its funding goal by the deadline, all contributions are automatically returned to the contributors through smart contracts. There are no fees charged for unsuccessful campaigns.",
    },
  ];

  return (
    <div>
      <div className="bg-gradient-to-b text-black from-white to-green-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-5xl font-semibold text-center mb-4">
            Frequently Asked Questions
          </h1>
          <h1 className="md:text-xl font-normal text-gray-600 text-center mb-4">
            Find answers to common questions about CrowdChain and learn how{" "}
            <br /> our platform works{" "}
          </h1>
        </div>
      </div>
      <div className="pt-14">
        {faqs.map((faq, index) => (
          <FAQsCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default page;
