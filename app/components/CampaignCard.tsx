import React,{ useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { generateSlug } from "../lib/utils";
import { FaXTwitter,FaLinkedinIn, FaFacebook} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { Copy, Check } from "lucide-react";

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
  
  const slug = generateSlug(title);

  const [campaignShareModal, setCampaignShareModal] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
  
  const handleShareCampaign =(e: React.MouseEvent)=>{
   setCampaignShareModal(true)
   e.stopPropagation();
   e.preventDefault(); 
  }

 
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(`${window.location.origin}/campaigns/${slug}`);
    }
  }, [slug]);

 
// helper function to copy campaign url
  const handleCopy = async (e: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(currentURL);
      setCopied(true);
      e.stopPropagation();
      e.preventDefault();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };


  return (
    <Link href={`/campaigns/${slug}`} className="block">
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
        onClick={handleShareCampaign}
         />
          {campaignShareModal && (
                <div className="  fixed  bg-black/50 min-h-screen z-10 w-screen mim-w-[50vw] flex justify-center items-center top-0 left-0 ">
                  <div className="bg-green-100 p-4 rounded-md">
                    <div className="gap-4 flex flex-col max-w-[400px] ">
                       
                      <IoCloseOutline  onClick={()=>setCampaignShareModal(!campaignShareModal)}  className="top-0 right-100 cursor-pointer w-6 h-6 "/>
                      <h2 className="font-semibold ">Share Campaign</h2>
                      <input type="text" />
                      <div className="flex gap-2">
                        URL:
                      <input
                          type="text"
                          readOnly
                          value={currentURL}
                            onFocus={(e) => e.target.select()}
                          className="flex px-3 py-2 border rounded-md bg-gray-100 text-gray-700 text-sm outline-none border-green-500"
                        />
                          <button
                          onClick={handleCopy}
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          {copied ? "Copied!" : "Copy"}
                        </button>


                      </div>     
                      <div className="flex gap-4 items-center justify-center ">
                      <FaFacebook className=" w-6 h-6 hover:text-green-700" />
                      <FaXTwitter  className=" w-6 h-6 hover:text-green-700"/>
                      <FaLinkedinIn  className=" w-6 h-6 hover:text-green-700"/>
                      < MdEmail   className=" w-6 h-6 hover:text-green-700"/>
                        
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
    </Link>
  );
};

export default Card;
