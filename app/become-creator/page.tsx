"use client";
import { useState, useRef, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useContract, useSendTransaction, useAccount, useTransactionReceipt } from '@starknet-react/core';
import { useRouter, notFound } from 'next/navigation';
import { CROWDCHAIN_CONTRACT_ADDRESS, CROWDCHAIN_ABI } from '@/lib/contract';
import { CreatorFormData } from "../types/creatorForm";
import { steps } from "../data/steps";

const CreatorPage = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CreatorFormData>({
    fullName: "",
    email: "",
    walletAddress: "",
    professionalTitle: "",
    linkedIn: "",
    website: "",
    verificationDocs: [],
    termsAgreed: false,
  });
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<'form' | 'blockchain' | 'backend' | 'complete'>('form');
  
  // Starknet contract integration
  const { contract } = useContract({
    address: CROWDCHAIN_CONTRACT_ADDRESS,
    abi: CROWDCHAIN_ABI as any
  });
  const { sendAsync: sendSubmitCreatorApplication } = useSendTransaction({ calls: [] });
  const [transactionHash, setTransactionHash] = useState<string>("");
  const { data: receipt } = useTransactionReceipt({ hash: transactionHash, watch: true });

  const verificationDocsRef = useRef<HTMLInputElement>(null);

  const { address, isConnected, account } = useAccount();
  const router = useRouter();



  // Auto-fill wallet address when connected
  useEffect(() => {
    if (isConnected && address) {
      setFormData(prev => ({
        ...prev,
        walletAddress: address
      }));
    }
  }, [isConnected, address]);

  // Handle transaction receipt - wait for blockchain confirmation before submitting to backend
  useEffect(() => {
    if (receipt && transactionHash && submissionStep === 'blockchain') {
      console.log('Transaction confirmed:', receipt);
      toast.loading('Transaction confirmed! Saving application data...', { id: 'submission' });
      setSubmissionStep('backend');
      
      // Submit to backend after blockchain confirmation
      submitToBackend()
        .then(() => {
          setSubmissionStep('complete');
          toast.success('Application submitted successfully! We\'ll review your application and get back to you soon.', { id: 'submission' });
          
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            walletAddress: "",
            professionalTitle: "",
            linkedIn: "",
            website: "",
            verificationDocs: [],
            termsAgreed: false,
          });
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        })
        .catch((error) => {
          console.error('Backend submission error:', error);
          toast.error('Failed to save application data. Please try again.', { id: 'submission' });
          setSubmissionStep('form');
          setIsSubmitting(false);
        })
        .finally(() => {
          setTransactionHash("");
        });
    }
  }, [receipt, transactionHash, submissionStep, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitToBackend = async () => {
    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('walletAddress', address || '');
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('professionalTitle', formData.professionalTitle);
      formDataToSend.append('linkedIn', formData.linkedIn);
      formDataToSend.append('website', formData.website);
      
      // Add verification documents
      if (formData.verificationDocs && formData.verificationDocs.length > 0) {
        for (const file of formData.verificationDocs) {
          formDataToSend.append('verificationDocs', file);
        }
      }
      
      const response = await fetch('http://localhost:3000/api/creator-application', {
        method: 'POST',
        // Don't set Content-Type header - let browser set it with boundary for FormData
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit to backend');
      }

      return await response.json();
    } catch (error) {
      console.error('Backend submission error:', error);
      throw error;
    }
  };

  const submitApplicationOnChain = async () => {
    if (!account) throw new Error('No account connected');
    
    const call = contract?.populate('submit_creator_application', []);
    
    const result = await sendSubmitCreatorApplication([call!]);
    
    // Store transaction hash for receipt monitoring
    if (result?.transaction_hash) {
      setTransactionHash(result.transaction_hash);
    }
    
    return result;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.professionalTitle) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStep('blockchain');

    try {
      // Submit application on-chain - transaction receipt will be handled by useEffect
      toast.loading('Submitting application on-chain...', { id: 'submission' });
      
      await submitApplicationOnChain();
      
      // Transaction receipt monitoring and backend submission will be handled by useEffect
      toast.loading('Waiting for transaction confirmation...', { id: 'submission' });

    } catch (error: any) {
      console.error('Submission error:', error);

      let errorMessage = 'Failed to submit application. Please try again.';

      if (error.message?.includes('Already approved creator')) {
        errorMessage = 'You are already an approved creator!';
      } else if (error.message?.includes('Application already pending')) {
        errorMessage = 'You already have a pending application.';
      } else if (error.message?.includes('Application already exists')) {
        errorMessage = 'An application already exists for this wallet address.';
      }

      toast.error(errorMessage, { id: 'submission' });
      setSubmissionStep('form');
      setIsSubmitting(false);
      setTransactionHash(""); // Clear transaction hash on error
    }
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    if (step < steps.length) {
      setStep(step + 1);
    } else {
      handleSubmit(e);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      return (
        !!formData.fullName && !!formData.email && !!formData.walletAddress
      );
    }
    if (step === 2) {
      return !!formData.professionalTitle;
    }
    if (step === 3) {
      return formData.termsAgreed && formData.verificationDocs.length > 0;
    }
    return true;
  };  

  const handleVerificationDocsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        verificationDocs: Array.from(e.target.files),
      });
    }
  };

  // Don't render anything if not connected (will redirect to 404)
    if (!isConnected) {
    return null;
    }

  return (
    <main className="mb-24">
      <section className="bg-[url('/images/bg-hero.png')] bg-cover bg-center h-56 flex items-center justify-center mb-20">
        <h1 className="text-5xl font-bold text-black">
          Become a <span className="text-[#1A5D1A]">Creator</span>
        </h1>
      </section>
      <section className="max-w-3xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-between mb-12">
          {steps.map((stepName, index) => (
            <div key={index}>
              <div className="flex flex-col gap-2 items-center">
                <div
                  className={`h-12 w-12 rounded-full flex justify-center items-center ${
                    step === index + 1 ? "bg-[#1B8520]" : "bg-[#F3F4F6]"
                  } mx-2`}
                >
                  <img
                    className="object-cover"
                    src={stepName.img}
                    alt={stepName.alt}
                  />
                </div>
                <p
                  className={
                    step === index + 1 ? "text-[#1B8520]" : "text-[#9CA3AF]"
                  }
                >
                  {stepName.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleNext}>
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="bg-white p-8 rounded-lg border-[1px] border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-black mb-6">
                Personal Information
              </h2>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] outline-none"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] outline-none"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Wallet Address
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    onChange={handleInputChange}
                    placeholder="Wallet connected"
                    className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-tl-md rounded-bl-md outline-none text-[#374151] bg-[#F3F4F6] cursor-not-allowed"
                    disabled
                    required
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-[#059669] text-white border-[1px] border-transparent rounded-tr-md rounded-br-md flex justify-center items-center gap-2 cursor-not-allowed opacity-75"
                    disabled
                  >
                    <img
                      src="/images/connect.png"
                      alt="wallet-icon"
                      className="object-cover"
                    />
                    Connected
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Background */}
          {step === 2 && (
            <div className="bg-white p-8 rounded-lg border-[1px] border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-black mb-6">
                Professional Background
              </h2>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleInputChange}
                  placeholder="Enter your professional title"
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] bg-[#F9FAFB] outline-none"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  placeholder="Enter LinkedIn URL"
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] bg-[#F9FAFB] outline-none"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Enter website URL"
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] bg-[#F9FAFB] outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Verification Documents */}
          {step === 3 && (
            <div className="bg-white p-8 rounded-lg border-[1px] border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-black mb-6">
                Verification Documents
              </h2>
              <div className="mb-5">
                <div
                  className="border-2 border-dashed border-[#D1D5DB] rounded-md p-5 min-h-40 text-center cursor-pointer flex flex-col justify-center items-center"
                  onClick={() => verificationDocsRef.current?.click()}
                >
                  <img
                    className="object-cover mb-1"
                    src="/images/upload.png"
                    alt="upload-icon"
                  />
                  <p className="text-[#4B5563] text-sm leading-7">
                    Upload identification documents <br />{" "}
                    <span className="text-[#1B8520] underline">
                      Browse files
                    </span>
                  </p>
                  <input
                    type="file"
                    multiple
                    ref={verificationDocsRef}
                    onChange={handleVerificationDocsChange}
                    className="hidden"
                  />
                  {formData.verificationDocs.length > 0 && (
                    <p className="mt-2 text-[#4B5563]">
                      {formData.verificationDocs.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <label className="flex items-center text-sm text-[#4B5563]">
                  <input
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        termsAgreed: e.target.checked,
                      })
                    }
                    className="mr-2 outline-none"
                    required
                  />
                  I agree to the Terms of Service and Privacy Policy. I confirm
                  that all provided information is accurate.
                </label>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-7 py-2 rounded-md border-[1px] cursor-pointer outline-none ${
                step === 1
                  ? "border-[#D1D5DB] text-[#4B5563]"
                  : "border-[#1B8520] text-[#1B8520]"
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-7 py-2 border-[1px] border-transparent bg-[#1B8520] text-white outline-none rounded-md cursor-pointer"
            >
              {step === steps.length ? "Submit" : "Next Step"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreatorPage;
