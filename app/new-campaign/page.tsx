// import Navbar from '../components/Navbar'
"use client";
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { generateCampaignSlug } from '../utils/slugify';

export default function CreateCampaign() {
	const slugCache = new Map<string, string>();

	const [campaignTitle, setCampaignTitle] = useState('');
	const [campaignSlug, setCampaignSlug] = useState('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
	const [paymentOption, setPaymentOption] = useState('STRK');
	
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

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check if file is an image
			if (file.type.startsWith('image/')) {
				setSelectedFile(file);
				// Create preview URL
				const url = URL.createObjectURL(file);
				setPreviewUrl(url);
			} else {
				alert('Please select an image file');
			}
		}
	};

	const removeFile = () => {
		setSelectedFile(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
		setIpfsUrl(null);
	};

	const uploadToIPFS = async (): Promise<string | null> => {
		if (!selectedFile) {
			alert('Please select an image first');
			return null;
		}

		try {
			setUploading(true);
			const formData = new FormData();
			formData.append('file', selectedFile);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			const result = await response.json();
			setIpfsUrl(result.ipfsUrl);
			return result.ipfsUrl;
		} catch (error) {
			console.error('Error uploading to IPFS:', error);
			alert('Failed to upload image to IPFS. Please try again.');
			return null;
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		// Upload image to IPFS first
		const imageUrl = await uploadToIPFS();
		
		if (imageUrl) {
			console.log('Campaign created with IPFS image URL:', imageUrl);
			console.log('Campaign Title:', campaignTitle);
			console.log('Campaign Slug:', campaignSlug);
			console.log('Payment Option:', paymentOption);
			// Here you can add your campaign creation logic
			alert(`Campaign created successfully! Payment option: ${paymentOption}, Image uploaded to IPFS: ${imageUrl}`);
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
							<form onSubmit={handleSubmit}>

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
									<textarea
										placeholder="Start typing your campaign description..."
										className="w-full text-black p-3 focus:outline-none min-h-[120px]"
									></textarea>
								</div>
							</div>

							<div className="mb-6">
								<label className="block text-black text-sm font-medium mb-1">
									Payment Option
								</label>
								<select
									value={paymentOption}
									onChange={(e) => setPaymentOption(e.target.value)}
									className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5D1A] bg-white"
								>
									<option value="STRK">Starknet Token (STRK)</option>
									<option value="USDC">USD Coin (USDC)</option>
									<option value="ETH">Ethereum (ETH)</option>
								</select>
								<div className="text-xs text-gray-500 mt-1">
									Choose the Starknet token for campaign funding
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<label className="block text-black text-sm font-medium mb-1">
										Funding Goal
									</label>
									<input
										type="number"
										placeholder={`0.00 ${paymentOption}`}
										className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5D1A]"
									/>
									<div className="text-xs text-gray-500 mt-1">
										Minimum {paymentOption === 'STRK' ? '50 STRK' : paymentOption === 'USDC' ? '100 USDC' : '0.05 ETH'}
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
									Campaign Image
								</label>
								
								{!selectedFile ? (
									<div className="relative">
										<input
											type="file"
											accept="image/*"
											onChange={handleFileSelect}
											className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
											id="file-upload"
										/>
										<div className="border-2 border-dashed border-[#1A5D1A] rounded-lg p-8 text-center hover:border-green-600 hover:bg-green-50 transition-colors cursor-pointer">
											<Upload className="mx-auto h-12 w-12 text-[#1A5D1A] mb-4" />
											<p className="text-[#1A5D1A] font-medium mb-2">Click to upload campaign image</p>
											<p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
										</div>
									</div>
								) : (
									<div className="relative">
										<div className="border-2 border-[#1A5D1A] rounded-lg p-4 bg-green-50">
											<div className="flex items-center justify-between mb-3">
												<span className="text-[#1A5D1A] font-medium text-sm">Selected Image:</span>
												<button
													onClick={removeFile}
													className="text-red-500 hover:text-red-700 transition-colors"
													type="button"
												>
													<X className="h-5 w-5" />
												</button>
											</div>
											{previewUrl && (
												<img
													src={previewUrl}
													alt="Campaign preview"
													className="w-full h-32 object-cover rounded-md mb-2"
												/>
											)}
											<p className="text-gray-700 text-sm truncate">{selectedFile.name}</p>
											<p className="text-gray-500 text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
											{ipfsUrl && (
												<div className="mt-2 p-2 bg-green-100 rounded">
													<p className="text-green-800 text-xs font-medium">✅ Uploaded to IPFS</p>
													<p className="text-green-600 text-xs truncate">{ipfsUrl}</p>
												</div>
											)}
										</div>
									</div>
								)}
							</div>

							<button 
								type="submit" 
								disabled={uploading || !selectedFile || !campaignTitle.trim()}
								className={`font-medium py-2 px-6 rounded transition-colors ${
									uploading || !selectedFile || !campaignTitle.trim() 
										? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
										: 'bg-green-800 text-white hover:bg-green-700'
								}`}
							>
								{uploading ? 'Uploading to IPFS...' : 'Launch Campaign'}
							</button>
							</form>
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
