"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"

type SignupStep = "options" | "email";

export function SignupForm() {
  const [step, setStep] = useState<SignupStep>("options");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Step 1: Email and password
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Starting signup process...');
    setError(null);
    setIsLoading(true);

    // Validate KIIT email
    if (!email.endsWith('@kiit.ac.in')) {
      console.log('Invalid KIIT email');
      setError('Please use your KIIT email address');
      setIsLoading(false);
      return;
  }

    // Validate password
    if (password.length < 6) {
      console.log('Password too short');
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Creating Firebase user...');
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Firebase user created:', user.uid);

      console.log('Updating profile...');
      // Update profile with name
      await updateProfile(user, {
        displayName: name
      });
      console.log('Profile updated');

      try {
        console.log('Storing user data in Firestore...');
        // Store additional user data in Firestore
        const db = getFirestore();
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        console.log('User data stored in Firestore');
      } catch (firestoreError) {
        // Log Firestore error but don't fail the signup
        console.error('Firestore error (non-critical):', firestoreError);
      }

      // Reset form and show success
      console.log('Resetting form state...');
      setStep("options");
      setEmail("");
      setPassword("");
      setName("");
      setIsLoading(false);
      console.log('Signup process completed');
      alert("Signup successful! You can now log in.");
    } catch (error: unknown) {
      console.error('Signup error:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already registered');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address');
            break;
          case 'auth/weak-password':
            setError('Password is too weak');
            break;
          default:
            setError('An error occurred during signup. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  }

  // Step rendering
  if (step === "email") {
    return (
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 flex items-center gap-3">
          <span className="text-green-400 text-xl">📧</span>
          <div>
            <div className="font-semibold text-green-300">Create your account</div>
            <div className="text-green-100 text-sm">Please enter your KIIT email and create a password</div>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}
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
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base text-foreground">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="bg-[#232b36] border border-white text-white placeholder:text-gray-400 focus:border-white focus:ring-0"
            minLength={6}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600 text-base font-semibold py-2 rounded-md shadow-none border-none"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
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