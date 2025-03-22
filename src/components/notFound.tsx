export default function NotFound()  {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/minimalbg.jpg')" }}
    >
      <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>

      <img
        src="/coolcar.png"
        alt="Car"
        className="w-64 md:w-80 mx-auto mb-4"
      />

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oh snap!</h2>

      <p className="text-gray-500 mb-6 max-w-md">
        Something went wrong with this page. You can go back home and take it from scratch.
      </p>

      <a
        href="/"
        className="inline-flex items-center px-4 py-2 border border-blue-900 text-blue-900 rounded hover:bg-blue-900 hover:text-white transition"
      >
        ← Back to Home
      </a>
    </div>
  )
}
