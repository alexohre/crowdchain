"use client";
import { useState, useRef, FormEvent } from "react";
import toast from "react-hot-toast";
import { CreatorFormData } from "../types/creatorForm";
import { steps } from "../data/steps";

const CreatorPage = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CreatorFormData>({
    fullName: "",
    email: "",
    walletAddress: "",
    profilePicture: null,
    professionalTitle: "",
    linkedIn: "",
    website: "",
    projectCategory: "",
    projectDescription: "",
    verificationDocs: [],
    termsAgreed: false,
  });
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const verificationDocsRef = useRef<HTMLInputElement>(null);

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    if (step < steps.length) {
      setStep(step + 1);
    } else {
      submitForm();
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
      return !!formData.projectCategory && !!formData.projectDescription;
    }
    if (step === 4) {
      return formData.termsAgreed && formData.verificationDocs.length > 0;
    }
    return true;
  };

  const submitForm = async () => {
    //API call simulation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Application submitted successfully!", {
        duration: 3000,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        walletAddress: "",
        profilePicture: null,
        professionalTitle: "",
        linkedIn: "",
        website: "",
        projectCategory: "",
        projectDescription: "",
        verificationDocs: [],
        termsAgreed: false,
      });
      setStep(1);
    } catch (error) {
      toast.error("Submission failed. Please try again.", {
        duration: 3000,
        style: {
          background: "#EF4444",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
        },
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
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
                    placeholder="Connect wallet to auto-fill"
                    className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-tl-md rounded-bl-md outline-none text-[#9CA3AF] placeholder:text-[#9CA3AF] bg-[#F9FAFB]"
                    required
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-[#1B8520] text-white  border-[1px] border-transparent rounded-tr-md rounded-br-md flex justify-center items-center gap-2 cursor-pointer outline-none"
                  >
                    <img
                      src="/images/connect.png"
                      alt="wallet-icon"
                      className="object-cover"
                    />
                    Connect
                  </button>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Profile Picture
                </label>
                <div
                  className="border-2 border-dashed border-[#D1D5DB] rounded-md p-5 min-h-40 text-center cursor-pointer flex flex-col justify-center items-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    className="object-cover mb-1"
                    src="/images/upload.png"
                    alt="upload-icon"
                  />
                  <p className="text-[#4B5563] text-sm leading-7">
                    Drag and drop your profile picture here <br /> or{" "}
                    <span className="text-[#1B8520] underline">browse</span>
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.profilePicture && (
                    <p className="mt-2 text-gray-600">
                      {formData.profilePicture.name}
                    </p>
                  )}
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

          {/* Step 3: Project Info */}
          {step === 3 && (
            <div className="bg-white p-8 rounded-lg border-[1px] border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-black mb-6">
                Project Info
              </h2>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Project Category
                </label>
                <select
                  name="projectCategory"
                  value={formData.projectCategory}
                  onChange={handleInputChange}
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] bg-[#F9FAFB] outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="tech">Tech</option>
                  <option value="education">Education</option>
                  <option value="research">Research</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-sm text-black mb-2">
                  Project Description
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your project"
                  className="w-full p-3 border-[1px] border-[#D1D5DB] rounded-md text-[#9CA3AF] placeholder:text-[#9CA3AF] h-32 resize-y bg-[#F9FAFB] outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Verification Documents */}
          {step === 4 && (
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
