export default function ReviewsSection() {
  // In a real app, these would come from props or a data source
  const ratings = [
    { stars: 5, count: 1523, percentage: 75 },
    { stars: 4, count: 398, percentage: 45 },
    { stars: 3, count: 38, percentage: 15 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const reviews = [
    {
      date: "Jan 20, 2023",
      rating: 5,
      author: { initials: "MN", name: "Mac N." },
      content:
        "I absolutely love my Suzuki Swift! The fuel efficiency is incredible - I can drive for days without worrying about refueling. The compact size makes it easy to maneuver in the city, yet the interior feels surprisingly spacious. Highly recommend for anyone looking for a stylish and practical car!",
    },
    {
      date: "Jan 31, 2023",
      rating: 5,
      author: { initials: "JM", name: "James R." },
      content:
        "I was looking for a car that balances performance and safety, and the Suzuki Swift delivers. The automatic emergency braking and lane departure warning give me peace of mind while driving.",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-4">Reviews</h2>
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold">4.0</span>
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-sm text-gray-500">(5k Reviews)</span>
        </div>

        <div className="mt-4 space-y-2">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-2">
              <span className="text-xs w-8">{rating.stars} stars</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs">{rating.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="text-sm text-gray-500 mb-1">{review.date}</div>
            <div className="flex mb-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                {review.author.initials}
              </div>
              <span className="font-medium">{review.author.name}</span>
            </div>
            <p className="text-sm text-[#484848]">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
