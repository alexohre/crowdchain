"use client";
import React, { useState } from "react";
import { ShareModalProps } from "../types/share-modal"; 

import { X, Copy } from "lucide-react";
import { FaTwitter, FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function ShareModal({ isOpen, onClose, campaignUrl, campaignTitle }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyUrl = async (e: any) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=Check out this campaign: ${encodeURIComponent(campaignTitle)}&url=${encodeURIComponent(campaignUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(campaignUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`Check out: ${campaignTitle}`)}&body=${encodeURIComponent(`I thought you might be interested in this campaign: ${campaignUrl}`)}`
  };

  const openShareWindow = (url: string, e: any) => {
    e.preventDefault();
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => e.preventDefault()}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Share Campaign</h3>
          <button
            onClick={(e) => { e.preventDefault(); onClose(); }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign URL
          </label>
          <div className="flex">
            <input
              type="text"
              value={campaignUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm text-green-800"
            />
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 bg-[#1A5D1A] text-white rounded-r-md hover:bg-[#0F4A0F] flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-3">Share on social media</p>
          
          <button
            onClick={(e) => openShareWindow(shareUrls.twitter, e)}
            className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaTwitter className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-gray-700">Share on Twitter</span>
          </button>

          <button
            onClick={(e) => openShareWindow(shareUrls.facebook, e)}
            className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaFacebook className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-700">Share on Facebook</span>
          </button>

          <button
            onClick={(e) => openShareWindow(shareUrls.linkedin, e)}
            className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaLinkedin className="h-5 w-5 text-blue-700 mr-3" />
            <span className="text-gray-700">Share on LinkedIn</span>
          </button>

          <button
            onClick={(e) =>  { window.location.href = shareUrls.email, e.preventDefault() }}
            className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaEnvelope className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-700">Share via Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}
