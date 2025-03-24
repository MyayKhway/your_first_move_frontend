import { Link } from "@tanstack/react-router";

export default function ReviewLoginPrompt() {
  return (
    <div className="p-6 bg-blue-100 text-xs border border-blue-300 rounded-2xl text-blue-800 text-center">
      <p className="text-lg">
        To make a review, you must <Link to="/signin" className="text-blue-600 font-semibold hover:underline">log in</Link> as a user.
      </p>
    </div>
  );
}
