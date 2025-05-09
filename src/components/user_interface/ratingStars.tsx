export const RatingStars: React.FC<{ rating: number; reviews: number }> = ({
  rating,
  reviews,
}) => (
  <div className="flex items-center space-x-2">
    <div className="flex text-yellow-500">
      {"\u2605".repeat(Math.round(rating))}
    </div>
    <div className="flex text-gray-500">
      {"\u2605".repeat(5 - Math.round(rating))}
    </div>
    <span className="text-gray-500">({reviews})</span>
  </div>)
