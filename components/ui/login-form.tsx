"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

export function LoginForm() {
  const [loginMethod, setLoginMethod] = useState<"credentials" | "google" | null>(null)
  const [emailVerification, setEmailVerification] = useState(false)

  const handleCredentialsClick = () => {
    setLoginMethod("credentials")
  }

  const handleGoogleClick = () => {
    setLoginMethod("google")
  }

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailVerification(true)
  }

  if (!loginMethod) {
    return (
      <div className="flex flex-col gap-4 pt-2">
        <Button
          variant="outline"
          className="flex items-center justify-between border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          onClick={handleCredentialsClick}
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
          <span>Login via Google</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  if (loginMethod === "credentials") {
    return (
      <form className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-300">
            Username
          </Label>
          <Input
            id="username"
            placeholder="Enter your username"
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/50"
        >
          Login
        </Button>
        <Button
          variant="link"
          className="w-full p-0 text-green-400 hover:text-green-300"
          onClick={() => setLoginMethod(null)}
        >
          Back to options
        </Button>
      </form>
    )
  }

  if (loginMethod === "google" && !emailVerification) {
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
          onClick={() => setLoginMethod(null)}
        >
          Back to options
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
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/50">
        Verify & Login
      </Button>
      <Button
        variant="link"
        className="w-full p-0 text-green-400 hover:text-green-300"
        onClick={() => setEmailVerification(false)}
      >
        Back
      </Button>
    </form>
  )
}
