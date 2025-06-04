"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const BRANCHES = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "Other"];
const INTERESTS = {
  Academics: ["Coding", "Research", "Projects"],
  Sports: ["Cricket", "Football", "Basketball"],
  Entertainment: ["Music", "Movies", "Gaming"],
};

type SignupStep = "options" | "email" | "otp" | "profile";

export function SignupForm() {
  const [step, setStep] = useState<SignupStep>("options");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile fields
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");

  function handleInterestChange(interest: string) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setProfilePhoto(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePhotoUrl(url);
    } else {
      setProfilePhotoUrl(null);
    }
  }

  // Step 1: Email verification
  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add real KIIT email validation and send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 800);
  }

  // Step 2: OTP verification
  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add real OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep("profile");
    }, 800);
  }

  // Step 3: Profile completion
  function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement signup logic
    setTimeout(() => {
      setIsLoading(false);
      alert("Signup complete! (placeholder)");
      setStep("options");
    }, 1000);
  }

  // Step rendering
  if (step === "email") {
    return (
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 flex items-center gap-3">
          <span className="text-green-400 text-xl">📧</span>
          <div>
            <div className="font-semibold text-green-300">Only KIIT email allowed</div>
            <div className="text-green-100 text-sm">Please enter your KIIT email ID for verification</div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="kiit-email" className="text-base text-foreground">KIIT Email ID</Label>
          <Input
            id="kiit-email"
            name="kiit-email"
            type="email"
            placeholder="yourname@kiit.ac.in"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="bg-[#232b36] border border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600 text-base font-semibold py-2 rounded-md shadow-none border-none"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>
        <button
          type="button"
          className="w-full text-green-400 hover:underline text-center mt-2"
          onClick={() => setStep("options")}
        >
          Back
        </button>
      </form>
    );
  }

  if (step === "otp") {
    return (
      <form onSubmit={handleOtpSubmit} className="space-y-4">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 flex items-center gap-3">
          <span className="text-green-400 text-xl">🔒</span>
          <div>
            <div className="font-semibold text-green-300">Verification required</div>
            <div className="text-green-100 text-sm">Enter the OTP sent to your KIIT email</div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="otp-code" className="text-base text-foreground">OTP Code</Label>
          <Input
            id="otp-code"
            name="otp-code"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
            disabled={isLoading}
            className="bg-[#232b36] border border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
            maxLength={6}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600 text-base font-semibold py-2 rounded-md shadow-none border-none"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>
        <button
          type="button"
          className="w-full text-green-400 hover:underline text-center mt-2"
          onClick={() => setStep("email")}
        >
          Back
        </button>
      </form>
    );
  }

  if (step === "profile") {
    return (
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 flex items-center gap-3">
          <span className="text-green-400 text-xl">📝</span>
          <div>
            <div className="font-semibold text-green-300">Complete your profile</div>
            <div className="text-green-100 text-sm">Add your details to help find the right circles</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-2xl overflow-hidden cursor-pointer"
            onClick={() => !isLoading && fileInputRef.current?.click()}
            style={{ position: 'relative' }}
          >
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span>+</span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
              disabled={isLoading}
            />
          </div>
          <Button
            type="button"
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            {profilePhoto ? "Change Photo" : "Add Photo"}
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base text-foreground">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={isLoading}
            className="bg-[#232b36] border border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="semester" className="text-base text-foreground">Semester/Year</Label>
            <select
              id="semester"
              name="semester"
              value={semester}
              onChange={e => setSemester(e.target.value)}
              required
              disabled={isLoading}
              className="w-full bg-[#232b36] border border-white text-white rounded-md px-3 py-2 focus:border-white focus:ring-0"
            >
              <option value="">Select</option>
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="branch" className="text-base text-foreground">Branch</Label>
            <select
              id="branch"
              name="branch"
              value={branch}
              onChange={e => setBranch(e.target.value)}
              required
              disabled={isLoading}
              className="w-full bg-[#232b36] border border-white text-white rounded-md px-3 py-2 focus:border-white focus:ring-0"
            >
              <option value="">Select</option>
              {BRANCHES.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Select Your Interests</div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(INTERESTS).map(([category, items]) => (
              <div key={category} className="bg-gray-800 rounded-lg p-3 flex-1 min-w-[120px]">
                <div className="text-green-400 font-semibold mb-2">{category}</div>
                <div className="flex flex-col gap-1">
                  {items.map((interest) => (
                    <label key={interest} className="flex items-center gap-2 text-white text-sm">
                      <input
                        type="checkbox"
                        value={interest}
                        checked={interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="accent-green-500"
                        disabled={isLoading}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600 text-base font-semibold py-2 rounded-md shadow-none border-none"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Complete Sign Up"}
        </Button>
        <button
          type="button"
          className="w-full text-green-400 hover:underline text-center mt-2"
          onClick={() => setStep("otp")}
        >
          Back
        </button>
      </form>
    );
  }

  // Default: options view
  return (
    <div className="space-y-4">
      <Button
        type="button"
        className="w-full bg-[#232b36] text-white hover:bg-[#2d3642] text-base font-semibold py-2 rounded-md border border-transparent mb-2"
        onClick={() => setStep("email")}
      >
        Sign up manually
      </Button>
      <div className="flex items-center my-2">
        <div className="flex-grow h-px bg-gray-600" />
        <span className="mx-2 text-gray-400 text-sm font-medium">OR</span>
        <div className="flex-grow h-px bg-gray-600" />
      </div>
      <Button
        type="button"
        className="w-full bg-[#f3f4f6] text-gray-400 hover:bg-gray-200 text-base font-semibold py-2 rounded-md border border-transparent"
        disabled
      >
        Sign up with Google
      </Button>
    </div>
  );
} 