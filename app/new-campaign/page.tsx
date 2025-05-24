// import Navbar from '../components/Navbar'
"use client";
import React, { useState } from 'react';
import { generateCampaignSlug } from '../utils/slugify';

export default function CreateCampaign() {
	const slugCache = new Map<string, string>();

	const [campaignTitle, setCampaignTitle] = useState('');
	const [campaignSlug, setCampaignSlug] = useState('');
	
	const handleCampaignTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		setCampaignTitle(title);

		if (title) {
			if (slugCache.has(title)) {
				setCampaignSlug(slugCache.get(title)!);
			} else {
				const newSlug = generateCampaignSlug(title);
				slugCache.set(title, newSlug);
				setCampaignSlug(newSlug);
			}
		}
	};
	
	return (
		<>
			{/* <div className="bg-gradient-to-b from-white to-green-60 py-10"> */}
			<div className="bg-gradient-to-b text-black from-white to-green-100 py-10">
				<div className="container mx-auto px-4">
					<h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
						Create a <span className="text-[#1A5D1A]">campaign</span> that
						inspires, <br />
						<span className="text-[#1A5D1A]">motivates!</span>, and drives
						change
					</h1>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<h2 className="text-3xl font-bold text-green-800 mb-2">
					Create Your Campaign
				</h2>
				<p className="text-[#2C5E43] mb-8">
					Turn your ideas into reality with community support
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="md:col-span-2">
						<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
							<h3 className="text-xl text-black font-medium mb-4">
								Campaign Details
							</h3>

							<div className="mb-4">
								<label className="block text-black text-sm font-medium mb-1">
									Campaign Title
								</label>
								<input
									type="text"
									value={campaignTitle}
									placeholder="Enter your campaign title"
									className="w-full text-gray-500 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5D1A]"
									onChange={handleCampaignTitleChange}
								/>
							</div>

							<div className="mb-4">
								<label className="block text-black text-sm font-medium mb-1">
									Campaign Description
								</label>
								<div className="border border-gray-300 rounded overflow-hidden">
									<div className="flex space-x-4 px-3 py-2 border-b">
										<button className="font-bold text-black">B</button>
										<button className="italic text-black">I</button>
										<button className="underline text-black">U</button>
										<button className="text-black">•</button>
									</div>
									<textarea
										placeholder="Start typing your campaign description..."
										className="w-full text-black p-3 focus:outline-none min-h-[120px]"
									></textarea>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-black text-sm font-medium mb-1">
										Funding Goal
									</label>
									<input
										type="number"
										placeholder="0.00"
										className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5D1A]"
									/>
									<div className="text-xs text-gray-500 mt-1">
										Minimum 0.1 ETH
									</div>
								</div>

								<div>
									<label className="block text-black text-sm font-medium mb-1">
										Campaign Deadline
									</label>
									<input
										type="date"
										placeholder="Select date"
										className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5D1A]"
									/>
								</div>
							</div>

							<div className="mb-6">
								<label className="block text-black text-sm font-medium mb-1">
									Campaign Image Url
								</label>
								<input
									type="text"
									placeholder="Enter your campaign image url"
									className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5D1A]"
								/>
							</div>

							<button className="bg-green-800 text-white font-medium py-2 px-6 rounded hover:bg-green-700 transition-colors">
								Launch Campaign
							</button>
						</div>
					</div>

					<div>
						<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
							<h3 className="text-xl text-black font-medium mb-4">
								Campaign Guidelines
							</h3>

							<ul className="space-y-3">
								<li className="flex items-start">
									<span className="text-green-600 mr-2">✓</span>
									<span className="text-black">
										Clear and specific campaign goal
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-600 mr-2">✓</span>
									<span className="text-black">
										Detailed description of your project
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-600 mr-2">✓</span>
									<span className="text-black">
										Realistic funding goal and timeline
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-600 mr-2">✓</span>
									<span className="text-black">
										High-quality images or videos
									</span>
								</li>
								<li className="flex items-start">
									<span className="text-green-600 mr-2">✓</span>
									<span className="text-black">Regular updates plan</span>
								</li>
							</ul>

							<div className="mt-4 bg-green-50 p-4 rounded">
								<p className="flex items-center text-sm text-green-800">
									<span className="mr-2 text-black">+</span>
									Need help? Check out our campaign creation guide
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
