import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Route } from '@/routes/_auth/resetpass'
import { toast } from "sonner"

export default function ResetPass() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { token } = Route.useSearch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Check password strength (optional)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/auth/reset-pass-user?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        password
      })
    })
    if (!res.ok) {
      setError("Error resetting password.")
      toast.error("Your password has been successfully updated")
      return
    }

    toast.success("Your password has been successfully updated")

    setPassword("")
    setConfirmPassword("")
    setError("")

    // Reset form
    setPassword("")
    setConfirmPassword("")
    setError("")
  }

  return (
    <div
      className="h-screen bg-[url(/background.jpg)] w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center"
    >
      <div className="max-w-md w-full mx-auto p-6 pt-10 bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-900">Reset Password</h2>
        <p className="text-gray-500">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" className="w-full !bg-blue-900 !text-white hover:!bg-blue-800 transition">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  )
}
