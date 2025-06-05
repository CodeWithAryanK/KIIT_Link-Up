"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { applyActionCode, checkActionCode } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      const actionCode = searchParams.get("oobCode")

      if (!actionCode) {
        setStatus("error")
        setMessage("Invalid verification link.")
        return
      }

      try {
        // Verify the action code is valid
        await checkActionCode(auth, actionCode)

        // Apply the email verification
        await applyActionCode(auth, actionCode)

        setStatus("success")
        setMessage("Email verified successfully!")

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login?verified=true")
        }, 3000)
      } catch (error: any) {
        setStatus("error")
        setMessage(error.message || "Failed to verify email.")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            {status === "loading" && <Loader2 className="h-6 w-6 animate-spin text-blue-600" />}
            {status === "success" && <CheckCircle className="h-6 w-6 text-green-600" />}
            {status === "error" && <XCircle className="h-6 w-6 text-red-600" />}
          </div>
          <CardTitle>
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant={status === "error" ? "destructive" : "default"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>

          {status === "success" && (
            <p className="text-sm text-gray-600 text-center">Redirecting to login page in 3 seconds...</p>
          )}

          {status === "error" && (
            <Button className="w-full" onClick={() => router.push("/auth/signup")}>
              Back to Signup
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
