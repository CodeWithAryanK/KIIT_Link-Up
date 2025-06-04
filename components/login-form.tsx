"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [showManualLogin, setShowManualLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    try {
      // TODO: Implement login logic
      console.log("Login attempt with:", { username, password })
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (showManualLogin) {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-base text-foreground">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            required
            disabled={isLoading}
            className="bg-[#232b36] border border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base text-foreground">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
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
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <button
          type="button"
          className="w-full text-green-400 hover:underline text-center mt-2"
          onClick={() => setShowManualLogin(false)}
        >
          Back to options
        </button>
      </form>
    )
  }

  return (
    <div className="space-y-4">
      <Button
        type="button"
        className="w-full bg-[#232b36] text-white hover:bg-[#2d3642] text-base font-semibold py-2 rounded-md border border-transparent mb-2"
        onClick={() => setShowManualLogin(true)}
      >
        Enter details manually
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
        Login via Google
      </Button>
    </div>
  )
} 