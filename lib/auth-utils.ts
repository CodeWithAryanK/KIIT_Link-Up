import { createUserWithEmailAndPassword, sendEmailVerification, signOut, type User } from "firebase/auth"
import { auth } from "./firebase"

export async function signUpWithEmailVerification(email: string, password: string, displayName: string) {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update display name
    await user.updateProfile({ displayName })

    // Send verification email
    await sendEmailVerification(user, {
      url: `${window.location.origin}/auth/login?verified=true`,
      handleCodeInApp: false,
    })

    // Sign out user until email is verified
    await signOut(auth)

    return {
      success: true,
      message: "Account created! Please check your email to verify your account.",
      user: null,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      user: null,
    }
  }
}

export function isEmailVerified(user: User | null): boolean {
  return user?.emailVerified ?? false
}
