"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="gradient-bg py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl text-[#000000] md:text-4xl max-w-[900px]text-400px lg:text-6xl font-extrabold leading-tight">
              <span className="text-[#1A5D1A]">Decentralized</span>
              <br />
              Crowdfunding for
              <br />
              Everyone
            </h1>

            <p className="text-[#374151] text-lg md:text-xl max-w-lg mt-3">
              Secure, Fast, and Decentralized Crowdfunding for innovative
              projects powered by StarkNet technology
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button className="bg-[#1A5D1A] text-white max-sm:text-center px-3 py-3 md:px-1 md:py-1 lg:px-3 lg:py-3 rounded-[8px] max-[500px]:rounded-full">
                <Link
                  href="/new-campaign"
                  className="flex items-center flex-col sm:flex-row text-center font-extrabold"
                >
                  Start Your Campaign{" "}
                  <ArrowRight className="ml-2 h-5 w-5 hidden min-[500px]:block" />
                </Link>
              </button>

              <button className="border-[#1A5D1A] border-2 text-[#1A5D1A] rounded-[8px] font-extrabold hover:bg-green-50 px-4 py-2 max-[500px]:rounded-full">
                <Link href="/about">Learn More</Link>
              </button>
            </div>

            {/* Stats - Desktop only */}
            <div className="hidden md:grid grid-cols-3 gap-4 pt-8 md:pt-12 text-lg lg:text-3xl">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <Image
                    src="/chart.svg"
                    alt="Chart Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 text-[#1A5D1A]"
                  />
                </div>
                <div className="text-[#1A5D1A] text-lg md:text-3xl font-extrabold">
                  $2.5M+
                </div>
                <div className="text-[#555555] font-medium-12  text-md md:text-2xl">
                  Raised
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <Image
                    src="/wallet.svg"
                    alt="Wallet Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 text-[#1A5D1A]"
                  />
                </div>
                <div className="text-[#1A5D1A] text-lg md:text-3xl font-extrabold">
                  1000+
                </div>
                <div className="text-[#555555] font-medium-12 text-md md:text-2xl">
                  Projects
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <Image
                    src="/box.svg"
                    alt="Box Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6 text-[#1A5D1A]"
                  />
                </div>
                <div className="text-[#1A5D1A] text-lg md:text-3xl font-extrabold">
                  50K+
                </div>
                <div className="text-[#555555] font-medium-12 text-md md:text-2xl ">
                  Backers
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden">
            {/* Desktop image */}
            <Image
              src="/heroImg.png"
              alt="Blockchain visualization"
              width={800}
              height={700}
              className="object-cover rounded-xl hidden md:block"
              priority
            />

            {/* Mobile image */}
            <Image
              src="/mbimg.png"
              alt="Blockchain"
              width={800}
              height={700}
              className="object-cover block md:hidden rounded-xl"
              priority
            />
          </div>

          {/* Stats - Mobile only */}
          <div className="md:hidden grid grid-cols-3 gap-4 pt-1 text-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image
                  src="/chart.svg"
                  alt="Chart Icon"
                  width={24}
                  height={24}
                  className="w-6 h-6 text-[#1A5D1A]"
                />
              </div>
              <div className="text-[#1A5D1A] text-3xl font-bold">$2.5M+</div>
              <div className="text-[#555555] font-bold">Raised</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image
                  src="/wallet.svg"
                  alt="Wallet Icon"
                  width={24}
                  height={24}
                  className="w-6 h-6 text-[#1A5D1A]"
                />
              </div>
              <div className="text-[#1A5D1A] text-3xl font-bold">1000+</div>
              <div className="text-[#555555] font-bold">Projects</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Image
                  src="/box.svg"
                  alt="Box Icon"
                  width={24}
                  height={24}
                  className="w-6 h-6 text-[#1A5D1A]"
                />
              </div>
              <div className="text-[#1A5D1A] text-3xl font-bold">50K+</div>
              <div className="text-[#555555] font-bold">Backers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
