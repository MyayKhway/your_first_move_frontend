export default function LoadingSpinner() {
  return (
    <div className="mt-2 pl-4 flex items-center bg-transparent">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-medium">Fueling up your car experience...</p>
      </div>
    </div>
  )
}
