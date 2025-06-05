"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signOut } from "firebase/auth"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || !user.emailVerified) {
        router.push("/")
        return
      }
      setUser(user)
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-00KFNlkVFlDAz4CLvpBnziDHPJck1I.png"
              alt="KIIT Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-green-400">KIIT LinkUp</span>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="text-gray-300 hover:text-white">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Welcome, {user.displayName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Your email: {user.email}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Circles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">You haven&apos;t joined any circles yet.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Suggested Circles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">No suggestions available yet.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 