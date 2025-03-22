import React from "react";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  image: string;
  raisedAmount: string;
  daysLeft: number;
  progress: number;
  status: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  raisedAmount,
  daysLeft,
  progress,
}) => {
  return (
    <div className="w-[300px] sm:w-[400px] h-[400px]  rounded-lg overflow-hidden shadow-md bg-white ">
      <div className="relative h-48 ">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        <div className="absolute top-2 right-5 bg-white/80 p-1 rounded-full">
        <Image
        src="/share.png"
        height={5}
        width={15}
        alt="share"

        
         />
         
        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
