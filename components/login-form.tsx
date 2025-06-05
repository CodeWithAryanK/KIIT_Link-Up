"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { FirebaseError } from "firebase/app"

export function LoginForm() {
  const [showManualLogin, setShowManualLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log("Login successful:", user.uid)
      
      // Reset form and show success
      setEmail("")
      setPassword("")
      setShowManualLogin(false)
      alert("Login successful!")
      
      // TODO: Redirect to dashboard or home page
    } catch (error: unknown) {
      console.error("Login failed:", error)
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            setError('Invalid email address')
            break
          case 'auth/user-disabled':
            setError('This account has been disabled')
            break
          case 'auth/user-not-found':
            setError('No account found with this email')
            break
          case 'auth/wrong-password':
            setError('Incorrect password')
            break
          default:
            setError('An error occurred during login. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (showManualLogin) {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 flex items-center gap-3">
          <span className="text-green-400 text-xl">🔐</span>
          <div>
            <div className="font-semibold text-green-300">Welcome back!</div>
            <div className="text-green-100 text-sm">Please enter your credentials to login</div>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base text-foreground">KIIT Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="yourname@kiit.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={() => {
            setShowManualLogin(false)
            setError(null)
            setEmail("")
            setPassword("")
          }}
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