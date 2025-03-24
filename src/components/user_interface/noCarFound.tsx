import { Car, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export function NoCarsFound() {
  return (
    <Card className="w-full max-w-screen mx-auto overflow-hidden border-blue-200 shadow-lg mb-20">
      <div className="bg-blue-600 h-2" />
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-blue-100 p-3 mb-2">
            <Car className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="text-xl font-semibold text-blue-800">No Matching Vehicles Found</h3>

          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
            <AlertCircle className="h-4 w-4" />
            <p>We're expanding our dealer network daily</p>
          </div>

          <p className="text-gray-600">
            Sorry, we don't have any cars matching your needs. As we have more dealers registered, we believe we can
            fulfil your requirements.
          </p>

          <div className="pt-4 flex gap-3">
            <Button variant="link" className="border-blue-300 bg-primary text-slate-100 hover:bg-blue-500">
              <Link to="/">Modify Search</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

