import Image from 'next/image';
import { FaRegClock, FaGlobe, FaShareAlt } from "react-icons/fa";


export default function CampaignDetails(){
    return(
        <>
        <div className="bg-white text-black py-10">

            <div className="mx-auto px-4 bg-gradient-to-b to-green-100 from-white min-h-[50vh] w-full flex items-center justify-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
                Join the <span className="text-green-700">movement</span> and be part of <br /> 
                something <span className="text-green-700">amazing!</span>
            </h1>
            </div>
            <div className="relative w-full max-w-5xl mx-auto mt-6">
            <Image
                src="/mbimg.svg"
                alt="Campaign Image"
                width={800} // Adjusted for a smaller display
                height={300} // Reduced height
                className="rounded-lg mx-auto w-[1200px] h-[200px] object-cover"
             />            
          </div>
    
          {/* Campaign Details */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl mx-auto mt-4">
            <h1 className="text-3xl font-bold mb-3">DeFi Innovation Hub</h1>
    
            {/* Progress Bar */}
            <div className="w-full bg-gray-300 h-2 rounded-full">
              <div className="bg-green-800 h-2 rounded-full" style={{ width: "72%" }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-2">
              <span>Raised <strong>145k STRK</strong></span>
              <span className="flex items-center space-x-2">
            <Image
                src="/time.svg"
                alt=""
                width={15} // Adjusted width
                height={15} // Adjusted height
                className="rounded-lg object-cover"
            /> 
            <span>12 days left</span>
            </span>
              <span>Funding Goal <strong>195k STRK</strong></span>
            </div>
    
            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-start
            ">
              <div className="border border-green-700 rounded-lg p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/time.svg" alt="" width={15} height={15} className="rounded-lg object-cover" />
                  <p className="text-sm text-gray-500">End Date</p>
                </div>
                <p className="font-bold">12-04-2025</p>
              </div>

              <div className="border border-green-700 rounded-lg p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/friends-circle.svg" alt="" width={15} height={15} className="rounded-lg object-cover" />
                  <p className="text-sm text-gray-500">Progress</p>
                </div>
                <p className="font-bold">72% funded</p>
              </div>

              <div className="border border-green-700 rounded-lg p-4 flex flex-col gap-1">
                <p className="text-sm text-gray-500">Creator</p>
                <p className="font-bold break-words">
                  0x1234567890123456789012345
                </p>
              </div>
            </div>

    
            {/* About Campaign */}
            <div className="mt-6 px-4">
            <h2 className="text-sm text-gray-700 font-bold mb-4">About this campaign</h2>
            <p className="text-gray-500 text-sm">
              Building a platform to provide accessible education through blockchain technology.<br/>
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Our mission is to democratize education by leveraging blockchain technology to create a decentralized learning platform that connects students
              directly with educators worldwide.<br/>  
            </p>
            <p className="text-gray-500 text-sm mt-6">
              The funds raised will be used for:<br/>
            </p>
              <ul className="list-none text-gray-500 text-sm">
                <li className="before:content-['-'] before:mr-2">Developing the core platform infrastructure</li>
                <li className="before:content-['-'] before:mr-2">Creating educational content</li>
                <li className="before:content-['-'] before:mr-2">Building a token-based incentive system for educators and learners</li>
                <li className="before:content-['-'] before:mr-2">Marketing and community building</li>
              </ul>
            <p className="text-gray-500 text-sm mt-4">
              By supporting this project, you're helping to create a future where quality education is accessible to everyone regardless of their location or economic status.
            </p>
          </div>
            <div className="bg-[rgba(178,210,168,1)] py-6 px-8 mt-10 rounded-lg shadow-md">
        
              <p className="font-semibold mb-2 text-green-800">Support this campaign</p>
              
              {/* Input + Button */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="flex-1 p-2 text-gray-700 rounded-md bg-white border border-gray-300 focus:outline-none"
                  />
                <button className="bg-[rgba(26,93,26,1)] text-white px-4 py-2 rounded-md hover:bg-green-800">
                  Donate
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-black mt-2">
                Your contribution will be recorded on the blockchain and cannot be refunded.
              </p>
          </div>
        </div>
      </div>
           
        </>
    )
}
