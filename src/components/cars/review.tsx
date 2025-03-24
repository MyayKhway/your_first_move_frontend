import { useAuth } from "@/authContext";
import ReviewForm from "./reviewForm";

interface ReviewType {
  userName: string,
  content: string,
  rating: number,
  date: string,
}
interface ReviewsSectionPropsType {
  reviews: ReviewType[]
}

interface RatingSummary {
  stars: number;
  count: number;
  percentage: number;
}

export default function ReviewsSection({ reviews }: ReviewsSectionPropsType) {
  const { user } = useAuth()
  function summarizeRatings(reviews: ReviewType[]): RatingSummary[] {
    const ratingSummary: RatingSummary[] = [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ];

    // If there are no reviews, return the initialized array
    if (reviews.length === 0) {
      return ratingSummary;
    }

    // Count occurrences of each rating
    reviews.forEach(review => {
      // Make sure the rating is between 1 and 5
      const ratingIndex = Math.min(Math.max(Math.floor(review.rating), 1), 5);
      // Increment the count for this rating
      ratingSummary[5 - ratingIndex].count += 1;
    });

    // Calculate percentages based on total reviews
    const totalReviews = reviews.length;
    ratingSummary.forEach(item => {
      item.percentage = Math.round((item.count / totalReviews) * 100);
    });

    return ratingSummary;
  }

  const ratings = summarizeRatings(reviews)
  const totalRatings = ratings.reduce((prev, next) => {
    const stars = next.stars * next.count
    return prev + stars
  }, 0)
  const averageRating = totalRatings / reviews.length


  return reviews.length > 0 ? (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-4">Reviews</h2>
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold">{averageRating}</span>
          <div className="flex">
            {[...Array(averageRating).keys()].map((star) => (
              <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">{reviews.length}</span>
        </div>

        <div className="mt-4 space-y-2">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-2">
              <span className="text-xs w-8">{rating.stars} stars</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${rating.percentage}%` }}></div>
              </div>
              <span className="text-xs">{rating.count}</span>
            </div>
          ))}
        </div>
      </div>
      <ReviewForm user={user} />

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="text-sm text-gray-500 mb-1">{review.date}</div>
            <div className="flex mb-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                {review.userName.substring(0, 2)}
              </div>
            </div>
            <p className="text-sm text-[#484848]">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <span className="text-blue-600 mb-10">No Reviews Available</span>
      <ReviewForm user={user} />
    </div>
  )
}
