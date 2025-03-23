"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="border-b-2 border-[#1A5D1A] bg-white">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link href="/" className="flex items-center">
							<span className="text-xl font-bold">
								<span className="text-black">Crowd</span>
								<span className="text-[#1A5D1A]">Chain</span>
							</span>
						</Link>
					</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#1A5D1A] transition-colors">
              Home
            </Link>
            <Link href="/Campaigns" className="text-gray-700 hover:text-[#1A5D1A] transition-colors">
              Campaigns
            </Link>
            <Link href="/faqs" className="text-gray-700 hover:text-[#1A5D1A] transition-colors">
              Faqs
            </Link>
            <Link href="/new_campaign" className="text-gray-700 hover:text-[#1A5D1A] transition-colors">
              New Campaign
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-[#1A5D1A] transition-colors">
              Dashboard
            </Link>
          </nav>

					{/* Desktop Connect Wallet Button */}
					<div className="hidden md:block">
						<button className="bg-[#1A5D1A] hover:bg-green-700 text-white py-2 px-4 rounded-md">
							Connect Wallet
						</button>
					</div>

					{/* Mobile Navigation Controls */}
					<div className="flex items-center gap-3 md:hidden">
						{/* Mobile Menu Button */}
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 text-gray-700"
							onClick={toggleMenu}
							aria-label="Open main menu"
						>
							<Menu className="h-6 w-6" />
						</button>

						{/* Mobile Connect Button */}
						<button className="bg-[#1A5D1A] hover:bg-green-700 text-white py-2 px-4 rounded-4xl">
							Connect
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
						<Link
							href="/"
							className="block px-3 py-2 text-gray-700 hover:text-[#1A5D1A] hover:bg-gray-50 rounded-md"
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/campaigns"
							className="block px-3 py-2 text-gray-700 hover:text-[#1A5D1A] hover:bg-gray-50 rounded-md"
							onClick={() => setIsMenuOpen(false)}
						>
							Campaigns
						</Link>
						<Link
							href="/faqs"
							className="block px-3 py-2 text-gray-700 hover:text-[#1A5D1A] hover:bg-gray-50 rounded-md"
							onClick={() => setIsMenuOpen(false)}
						>
							Faqs
						</Link>
						<Link
							href="/new-campaign"
							className="block px-3 py-2 text-gray-700 hover:text-[#1A5D1A] hover:bg-gray-50 rounded-md"
							onClick={() => setIsMenuOpen(false)}
						>
							New Campaign
						</Link>
						<Link
							href="/dashboard"
							className="block px-3 py-2 text-gray-700 hover:text-[#1A5D1A] hover:bg-gray-50 rounded-md"
							onClick={() => setIsMenuOpen(false)}
						>
							Dashboard
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
