"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Upload } from "lucide-react"

export function SignupForm() {
  const [step, setStep] = useState<"method" | "email" | "otp" | "profile">("method")

  const handleGoogleClick = () => {
    setStep("email")
  }

  const handleManualClick = () => {
    setStep("email")
  }

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("otp")
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("profile")
  }

  if (step === "method") {
    return (
      <div className="flex flex-col gap-4 pt-2">
        <Button
          variant="outline"
          className="flex items-center justify-between border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          onClick={handleManualClick}
        >
          <span>Enter details manually</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="bg-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-gray-400">Or</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-between border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          onClick={handleGoogleClick}
        >
          <span>Sign up via Google</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  if (step === "email") {
    return (
      <form className="space-y-4 pt-2" onSubmit={handleVerifyEmail}>
        <div className="rounded-md bg-green-900/30 p-3 text-sm border border-green-700">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-00KFNlkVFlDAz4CLvpBnziDHPJck1I.png"
              alt="KIIT Logo"
              className="h-4 w-4"
            />
            <p className="font-medium text-green-300">Only KIIT email allowed</p>
          </div>
          <p className="text-green-200">Please enter your KIIT email ID for verification</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="kiit-email" className="text-gray-300">
            KIIT Email ID
          </Label>
          <Input
            id="kiit-email"
            type="email"
            placeholder="yourname@kiit.ac.in"
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/50"
        >
          Verify Email
        </Button>
        <Button
          variant="link"
          className="w-full p-0 text-green-400 hover:text-green-300"
          onClick={() => setStep("method")}
        >
          Back
        </Button>
      </form>
    )
  }

  if (step === "otp") {
    return (
      <form className="space-y-4 pt-2" onSubmit={handleVerifyOtp}>
        <div className="rounded-md bg-green-900/30 p-3 text-sm border border-green-700">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-00KFNlkVFlDAz4CLvpBnziDHPJck1I.png"
              alt="KIIT Logo"
              className="h-4 w-4"
            />
            <p className="font-medium text-green-300">Verification required</p>
          </div>
          <p className="text-green-200">Enter the OTP sent to your KIIT email</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-gray-300">
            OTP Code
          </Label>
          <Input
            id="otp"
            placeholder="Enter 6-digit OTP"
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/50"
        >
          Verify & Continue
        </Button>
        <Button
          variant="link"
          className="w-full p-0 text-green-400 hover:text-green-300"
          onClick={() => setStep("email")}
        >
          Back
        </Button>
      </form>
    )
  }

  return (
    <form className="space-y-4 pt-2">
      <div className="rounded-md bg-green-900/30 p-3 text-sm border border-green-700">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-00KFNlkVFlDAz4CLvpBnziDHPJck1I.png"
            alt="KIIT Logo"
            className="h-4 w-4"
          />
          <p className="font-medium text-green-300">Complete your profile</p>
        </div>
        <p className="text-green-200">Add your details to help find the right circles</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo" className="text-gray-300">
          Profile Photo
        </Label>
        <div className="flex items-center gap-2">
          <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
            <Upload className="h-6 w-6 text-green-400" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Add Photo
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300">
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your name"
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="semester" className="text-gray-300">
            Semester/Year
          </Label>
          <Select>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SelectItem key={sem} value={sem.toString()} className="text-white hover:bg-gray-600">
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch" className="text-gray-300">
            Branch
          </Label>
          <Select>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="cse" className="text-white hover:bg-gray-600">
                Computer Science
              </SelectItem>
              <SelectItem value="it" className="text-white hover:bg-gray-600">
                Information Technology
              </SelectItem>
              <SelectItem value="ece" className="text-white hover:bg-gray-600">
                Electronics & Comm.
              </SelectItem>
              <SelectItem value="ee" className="text-white hover:bg-gray-600">
                Electrical
              </SelectItem>
              <SelectItem value="me" className="text-white hover:bg-gray-600">
                Mechanical
              </SelectItem>
              <SelectItem value="civil" className="text-white hover:bg-gray-600">
                Civil
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-300">Select Your Interests</Label>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-md border border-gray-600 p-3 bg-gray-800/50">
            <h4 className="mb-2 font-medium text-green-400">Academics</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="coding" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="coding" className="text-sm text-gray-300">
                  Coding
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="research" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="research" className="text-sm text-gray-300">
                  Research
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="projects" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="projects" className="text-sm text-gray-300">
                  Projects
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-600 p-3 bg-gray-800/50">
            <h4 className="mb-2 font-medium text-green-400">Sports</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cricket" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="cricket" className="text-sm text-gray-300">
                  Cricket
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="football" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="football" className="text-sm text-gray-300">
                  Football
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="basketball" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="basketball" className="text-sm text-gray-300">
                  Basketball
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-600 p-3 bg-gray-800/50">
            <h4 className="mb-2 font-medium text-green-400">Entertainment</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="music" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="music" className="text-sm text-gray-300">
                  Music
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="movies" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="movies" className="text-sm text-gray-300">
                  Movies
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gaming" className="border-gray-500 data-[state=checked]:bg-green-600" />
                <label htmlFor="gaming" className="text-sm text-gray-300">
                  Gaming
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/50">
        Complete Sign Up
      </Button>
    </form>
  )
}
