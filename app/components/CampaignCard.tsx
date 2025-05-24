import React, { useState } from "react";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { Share2 } from "lucide-react";
import ShareModal from "./ShareModal";

interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  raisedAmount: string;
  daysLeft: number;
  progress: number;
  status: string;
  slug?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  image,
  raisedAmount,
  daysLeft,
  progress,
  slug,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  
  const campaignUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/campaigns/${slug}` 
    : `/campaigns/${slug}`;

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowShareModal(true);
  };

  return (
    <>
      <div className="w-[300px] sm:w-[400px] h-[400px]  rounded-lg overflow-hidden shadow-md bg-white ">
        <div className="relative h-48 ">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <button
            onClick={handleShareClick}
            className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Share campaign"
          >
            <Share2 className="h-4 w-4 text-[#1A5D1A]" />
          </button>
        </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        <p className="text-gray-600 text-xs mt-1">{description}</p>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-gray-600 text-xs">Raised</p>

            <p className="font-bold text-gray-900">{raisedAmount} ETH</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaRegClock className="text-black text-[10px] mt-[2px]" />
            <p className="text-gray-600 text-sm">{daysLeft} days left</p>
          </div>        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        campaignUrl={campaignUrl}
        campaignTitle={title}
      />
      </div>
    </>
  );
};

export default Card;
