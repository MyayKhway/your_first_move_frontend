import { User } from "@/authContext";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouterState } from "@tanstack/react-router";

interface ReviewFormPropsType {
  user: User | null,
}
export default function ReviewForm({ user }: ReviewFormPropsType) {
  const [reviewText, setReviewText] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouterState()
  const url = router.location.pathname.split('/')
  const carId = parseInt(url[url.length - 1])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRating === 0 || !reviewText.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/car/reviews`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId,
        userId: user?.id,
        rating: selectedRating,
        content: reviewText
      })
    })
    if (!res.ok) {
      toast.error('Review Submission Failed.', {
        description: "Sorry, please try again later."
      })
    }
    // Reset form
    setReviewText("")
    setSelectedRating(0)
    setIsSubmitting(false)

  }
  if (!user || user.type !== 'user') {
    return null
  }
  return (
    <div className="mb-8 p-4 border border-gray-200 rounded-lg" >
      <h3 className="text-lg font-medium mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className="focus:outline-none"
                onClick={() => setSelectedRating(rating)}
              >
                <svg
                  className={`w-6 h-6 ${rating <= selectedRating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <Textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with this product..."
            className="min-h-[100px]"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting || selectedRating === 0 || !reviewText.trim()}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div >
  )
}
